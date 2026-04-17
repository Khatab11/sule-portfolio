import { defineMiddleware } from 'astro:middleware';

/**
 * Protects /admin by requiring the Keystatic GitHub OAuth session cookie.
 * When Keystatic is configured with `storage: { kind: 'github' }` it sets
 * a `keystatic-gh-access-token` cookie after successful login. We reuse
 * that same session so one GitHub login covers both /keystatic and /admin.
 *
 * Locally (where Keystatic runs in `local` mode and doesn't set the cookie)
 * /admin is accessible without login — that's by design for the developer
 * experience during `npm run dev`.
 */
export const onRequest = defineMiddleware(async (ctx, next) => {
  const { pathname } = ctx.url;
  const needsAuth = pathname === '/admin' || pathname.startsWith('/admin/');
  if (!needsAuth) return next();

  const isDev = import.meta.env.DEV;
  if (isDev) return next();

  const token =
    ctx.cookies.get('keystatic-gh-access-token')?.value ??
    ctx.cookies.get('keystatic-cloud-access-token')?.value;

  if (!token) {
    // Trigger Keystatic's GitHub login flow, then bounce back to /admin.
    const from = encodeURIComponent(pathname);
    return ctx.redirect(`/keystatic?from=${from}`);
  }

  return next();
});
