import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Welldonewood',
  tagline: 'Fine woodworking craftsmanship',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://welldonewood.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'welldonewood', // Usually your GitHub org/user name.
  projectName: 'welldonewood-site', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/welldonewood/welldonewood-site/tree/main/website/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/welldonewood/welldonewood-site/tree/main/website/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/welldonewood-social-card.jpg',
    navbar: {
      title: 'Welldonewood',
      logo: {
        alt: 'Welldonewood Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/products', 
          label: 'Products', 
          position: 'left'
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Services',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/contact', label: 'Contact', position: 'left'},
        {
          href: 'https://facebook.com/welldonewood',
          label: 'Facebook',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Products',
          items: [
            {
              label: 'Dining Tables',
              to: '/products/category/dining-tables',
            },
            {
              label: 'Coffee Tables',
              to: '/products/category/coffee-tables',
            },
            {
              label: 'Bookshelves',
              to: '/products/category/bookshelves',
            },
            {
              label: 'Custom Work',
              to: '/products/category/custom',
            },
          ],
        },
        {
          title: 'Services',
          items: [
            {
              label: 'Woodworking Classes',
              to: '/docs/services/classes',
            },
            {
              label: 'Furniture Restoration',
              to: '/docs/services/restoration',
            },
            {
              label: 'Design Consultation',
              to: '/docs/services/design',
            },
          ],
        },
        {
          title: 'Connect',
          items: [
            {
              label: 'Facebook',
              href: 'https://facebook.com/welldonewood',
            },
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/company/welldonewood',
            },
            {
              label: 'Pinterest',
              href: 'https://pinterest.com/welldonewood',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Welldonewood. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  // Add scripts for Netlify CMS
  scripts: [
    {
      src: 'https://identity.netlify.com/v1/netlify-identity-widget.js',
      async: true,
    },
    {
      src: '/admin/netlify-cms-redirect.js',
      async: true,
    },
  ],
};

export default config;
