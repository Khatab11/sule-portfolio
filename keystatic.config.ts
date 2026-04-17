import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage:
    process.env.NODE_ENV === 'development'
      ? { kind: 'local' }
      : {
          kind: 'github',
          repo: 'Khatab11/sule-portfolio',
        },

  ui: {
    brand: { name: 'Şule B. T. Portfolio' },
    navigation: {
      Content: ['blog', 'publications', 'researchTracks'],
      CV: ['education', 'appointments', 'adminRoles', 'awards', 'teaching'],
      Site: ['academicProfiles', 'navLinks', 'siteSettings'],
      Submissions: ['submissions'],
    },
  },

  singletons: {
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'src/content/site-settings/settings',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Name', validation: { isRequired: true } }),
        title: fields.text({ label: 'Title / Headline', validation: { isRequired: true } }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        heroImage: fields.image({
          label: 'Hero image',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        email: fields.text({ label: 'Email' }),
        institution: fields.text({ label: 'Institution' }),
        footerText: fields.text({ label: 'Footer text', multiline: true }),
      },
    }),
  },

  collections: {
    blog: collection({
      label: 'Blog posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date' }),
        description: fields.text({ label: 'Description', multiline: true }),
        image: fields.image({
          label: 'Cover image',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (p) => p.value,
        }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),

    publications: collection({
      label: 'Publications',
      slugField: 'title',
      path: 'src/content/publications/*',
      format: { data: 'yaml' },
      columns: ['year', 'journal'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        journal: fields.text({ label: 'Journal' }),
        year: fields.integer({ label: 'Year' }),
        doi: fields.text({ label: 'DOI URL' }),
        note: fields.text({ label: 'Note (co-authors, etc.)' }),
        desc: fields.text({ label: 'Description', multiline: true }),
        isBook: fields.checkbox({ label: 'Is book', defaultValue: false }),
        trackId: fields.select({
          label: 'Research track',
          options: [
            { label: '— None —', value: '' },
            { label: 'Sofalizing', value: 'sofalizing' },
            { label: 'Sharenting', value: 'sharenting' },
            { label: 'Phubbing', value: 'phubbing' },
            { label: 'Social Media Addiction', value: 'social-media-addiction' },
          ],
          defaultValue: '',
        }),
        featured: fields.checkbox({ label: 'Featured on homepage', defaultValue: false }),
        order: fields.integer({ label: 'Display order', defaultValue: 0 }),
      },
    }),

    researchTracks: collection({
      label: 'Research tracks',
      slugField: 'title',
      path: 'src/content/research-tracks/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        definition: fields.text({ label: 'Definition', multiline: true }),
        img: fields.image({
          label: 'Image',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        pubLink: fields.text({ label: 'Publications anchor / link' }),
        desc: fields.text({ label: 'Description', multiline: true }),
        order: fields.integer({ label: 'Order', defaultValue: 0 }),
      },
    }),

    education: collection({
      label: 'Education',
      slugField: 'degree',
      path: 'src/content/education/*',
      format: { data: 'yaml' },
      schema: {
        degree: fields.slug({ name: { label: 'Degree' } }),
        institution: fields.text({ label: 'Institution' }),
        department: fields.text({ label: 'Department' }),
        period: fields.text({ label: 'Period (e.g. 2010 – 2014)' }),
        thesis: fields.text({ label: 'Thesis', multiline: true }),
        logo: fields.image({
          label: 'Logo',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        initials: fields.text({ label: 'Initials fallback' }),
        order: fields.integer({ label: 'Order', defaultValue: 0 }),
      },
    }),

    appointments: collection({
      label: 'Appointments',
      slugField: 'role',
      path: 'src/content/appointments/*',
      format: { data: 'yaml' },
      schema: {
        role: fields.slug({ name: { label: 'Role' } }),
        institution: fields.text({ label: 'Institution' }),
        period: fields.text({ label: 'Period' }),
        current: fields.checkbox({ label: 'Current', defaultValue: false }),
        logo: fields.image({
          label: 'Logo',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        initials: fields.text({ label: 'Initials fallback' }),
        order: fields.integer({ label: 'Order', defaultValue: 0 }),
      },
    }),

    adminRoles: collection({
      label: 'Administrative roles',
      slugField: 'role',
      path: 'src/content/admin-roles/*',
      format: { data: 'yaml' },
      schema: {
        role: fields.slug({ name: { label: 'Role' } }),
        institution: fields.text({ label: 'Institution' }),
        period: fields.text({ label: 'Period' }),
        order: fields.integer({ label: 'Order', defaultValue: 0 }),
      },
    }),

    awards: collection({
      label: 'Awards',
      slugField: 'title',
      path: 'src/content/awards/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        issuer: fields.text({ label: 'Issuer' }),
        year: fields.text({ label: 'Year' }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'University', value: 'university' },
            { label: 'TÜBİTAK', value: 'tubitak' },
            { label: 'Fellowship', value: 'fellowship' },
          ],
          defaultValue: 'university',
        }),
        order: fields.integer({ label: 'Order', defaultValue: 0 }),
      },
    }),

    teaching: collection({
      label: 'Teaching',
      slugField: 'title',
      path: 'src/content/teaching/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Course' } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Designed', value: 'designed' },
            { label: 'Taught', value: 'taught' },
          ],
          defaultValue: 'taught',
        }),
        level: fields.text({ label: 'Level' }),
        order: fields.integer({ label: 'Order', defaultValue: 0 }),
      },
    }),

    academicProfiles: collection({
      label: 'Academic profiles',
      slugField: 'label',
      path: 'src/content/academic-profiles/*',
      format: { data: 'yaml' },
      schema: {
        label: fields.slug({ name: { label: 'Label' } }),
        href: fields.text({ label: 'URL' }),
        desc: fields.text({ label: 'Description' }),
        icon: fields.text({ label: 'Icon (svg path d or key)' }),
        order: fields.integer({ label: 'Order', defaultValue: 0 }),
      },
    }),

    navLinks: collection({
      label: 'Navigation links',
      slugField: 'label',
      path: 'src/content/nav-links/*',
      format: { data: 'yaml' },
      schema: {
        label: fields.slug({ name: { label: 'Label' } }),
        href: fields.text({ label: 'Href' }),
        order: fields.integer({ label: 'Order', defaultValue: 0 }),
      },
    }),

    submissions: collection({
      label: 'Form submissions (read-only)',
      slugField: 'subject',
      path: 'src/content/submissions/*',
      format: { contentField: 'message' },
      columns: ['name', 'email'],
      schema: {
        subject: fields.slug({ name: { label: 'Subject' } }),
        name: fields.text({ label: 'Name' }),
        email: fields.text({ label: 'Email' }),
        receivedAt: fields.datetime({ label: 'Received at' }),
        message: fields.markdoc({ label: 'Message' }),
      },
    }),
  },
});
