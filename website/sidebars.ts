import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  documentationSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Website Structure',
      collapsed: false,
      items: [
        'site-structure',
        'technical-architecture',
      ],
    },
    {
      type: 'category',
      label: 'Functionality',
      collapsed: false,
      items: [
        'integration-flows',
        'user-journeys',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      collapsed: false,
      items: [
        'development-guidelines',
        'content-management',
      ],
    },
    {
      type: 'category',
      label: 'Implementation',
      collapsed: false,
      items: [
        'deployment-plan',
      ],
    },
  ],
};

export default sidebars;
