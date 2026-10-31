import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Tracklr SDK',
  tagline: 'Unified TypeScript API Client for Tracklr Business Suite',
  favicon: 'img/tracklr-logo.png',

  url: 'https://docs.tracklr.app',
  baseUrl: '/',

  organizationName: 'Davidoshin',
  projectName: 'tracklr-business',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

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
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/tracklr-logo.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Tracklr SDK',
      logo: {
        alt: 'Tracklr Logo',
        src: 'img/tracklr-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/docs/modules/auth',
          label: 'API Reference',
          position: 'left',
        },
        {
          to: '/docs/examples-overview',
          label: 'Runnable Examples',
          position: 'left',
        },
        {
          href: 'https://github.com/Davidoshin/tracklr-business',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Installation & Setup',
              to: '/docs/installation',
            },
            {
              label: 'API Modules Reference',
              to: '/docs/modules/auth',
            },
            {
              label: 'Storage & Platform Adapters',
              to: '/docs/storage-adapters',
            },
          ],
        },
        {
          title: 'Applications',
          items: [
            {
              label: 'Retail Web App',
              href: 'https://biz.henotaceai.ng',
            },
            {
              label: 'Retail Mobile App',
              href: 'https://tracklr.com/mobile',
            },
            {
              label: 'Production Business',
              href: 'https://biz.henotaceai.ng/production',
            },
          ],
        },
        {
          title: 'Support & Community',
          items: [
            {
              label: 'Support Email',
              href: 'mailto:support@tracklr.app',
            },
            {
              label: 'WhatsApp Support',
              href: 'https://wa.me/2349072590710',
            },
            {
              label: 'GitHub Repository',
              href: 'https://github.com/Davidoshin/tracklr-business',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Tracklr Business. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
