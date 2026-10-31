import type {ReactNode} from 'react';
import Heading from '@theme/Heading';

type FeatureItem = {
  title: string;
  icon: string;
  description: string;
  badge: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Strict Multi-Tenancy & Platform Headers',
    icon: '🏢',
    badge: 'Enterprise Security',
    description:
      'Seamlessly attaches X-Tenant-ID, X-Business-Slug, and X-Client-Platform headers to every request, preventing cross-tenant leakage across Web, Mobile, and Desktop.',
  },
  {
    title: 'Mutex-Locked Token Refresh',
    icon: '🔄',
    badge: 'Zero Race Conditions',
    description:
      'Handles expired JWT tokens effortlessly. When 401 is encountered, concurrent API requests are queued while a single refresh completes, replay-firing without user disruption.',
  },
  {
    title: 'Full Production & Retail Business Suite',
    icon: '🏭',
    badge: '16 Specialized Modules',
    description:
      'Typed clients for Retail POS, Inventory Management, Recipe & BOM Costing, Production Batches, Waste Tracking, Financial Ledgers, and Staff RBAC.',
  },
  {
    title: 'Pluggable Storage Adapters',
    icon: '💾',
    badge: 'Universal JavaScript',
    description:
      'Works in Browser (localStorage), Mobile (Capacitor Preferences), and Node.js environments with custom in-memory or Redis token storage.',
  },
  {
    title: 'White-Label Platform Admin API',
    icon: '⚡',
    badge: 'Partner Scoped',
    description:
      'Built-in support for partner scoped tenant queries, Flutterwave payment gateway configuration, plan price overrides, and manual wallet top-up audits.',
  },
  {
    title: 'Zero Third-Party Client Bloat',
    icon: '🚀',
    badge: 'Modern Fetch Engine',
    description:
      'Engineered with modern Fetch standards and zero bloated HTTP wrappers. Fully tree-shakeable with 100% TypeScript typing and autocompletion.',
  },
];

export default function HomepageFeatures(): ReactNode {
  return (
    <section style={{padding: '3rem 0 5rem'}}>
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: '3rem'}}>
          <div className="tracklr-hero-badge">Architecture & Capabilities</div>
          <Heading as="h2" style={{fontSize: '2.25rem', fontWeight: 800}}>
            Engineered for Modern Enterprise Multi-Tenancy
          </Heading>
          <p style={{color: 'var(--ifm-color-emphasis-700)', maxWidth: 640, margin: '0.75rem auto 0'}}>
            @tracklr/sdk powers all web portals, native mobile apps, and backend automation workflows with bulletproof reliability.
          </p>
        </div>
        <div className="tracklr-grid">
          {FeatureList.map((item, idx) => (
            <div key={idx} className="tracklr-feature-card">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem'}}>
                <span className="tracklr-card-icon">{item.icon}</span>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  color: 'var(--ifm-color-primary)',
                  border: '1px solid rgba(99, 102, 241, 0.2)'
                }}>
                  {item.badge}
                </span>
              </div>
              <h3 className="tracklr-card-title">{item.title}</h3>
              <p className="tracklr-card-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
