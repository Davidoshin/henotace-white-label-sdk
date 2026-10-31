import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'intro',
        'installation',
        'configuration',
        'storage-adapters',
      ],
    },
    {
      type: 'category',
      label: 'Core Business Modules',
      collapsed: false,
      items: [
        'modules/auth',
        'modules/tenancy',
        'modules/retail',
        'modules/production',
        'modules/inventory',
        'modules/finance',
        'modules/staff',
        'modules/admin',
      ],
    },
    {
      type: 'category',
      label: 'Extended Services & Domains',
      collapsed: true,
      items: [
        'modules/customer',
        'modules/delivery',
        'modules/departments',
        'modules/suppliers',
        'modules/services',
        'modules/insurance',
        'modules/education',
        'modules/http-client',
      ],
    },
    {
      type: 'category',
      label: 'Runnable Examples',
      collapsed: false,
      items: [
        'examples-overview',
      ],
    },
  ],
};

export default sidebars;
