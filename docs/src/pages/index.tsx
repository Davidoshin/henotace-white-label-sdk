import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="tracklr-hero">
      <div className="container">
        <div className="tracklr-hero-badge">
          <span>🚀 Version 1.0.0 Now Live</span>
          <span style={{opacity: 0.5}}>•</span>
          <span>TypeScript Native</span>
        </div>
        <h1 className="tracklr-hero-title">
          The Official Developer SDK<br />for Tracklr Business
        </h1>
        <p className="tracklr-hero-subtitle">
          A unified, fully-typed API client connecting Retail POS, Manufacturing Production,
          Financial Ledgers, and Multi-Tenant Partner Administration.
        </p>
        <div className="tracklr-hero-buttons">
          <Link className="tracklr-btn-primary" to="/docs/intro">
            Get Started ⏱️ 5 min
          </Link>
          <Link className="tracklr-btn-secondary" to="/docs/modules/auth">
            Browse API Modules 📖
          </Link>
          <Link className="tracklr-btn-secondary" to="/docs/examples-overview">
            Runnable Examples 💻
          </Link>
        </div>

        {/* Interactive Quick Code Sneak-Peek */}
        <div style={{maxWidth: 780, margin: '3.5rem auto 0', textAlign: 'left'}}>
          <div style={{
            background: '#0d1117',
            border: '1px solid #30363d',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.45)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem 1rem',
              background: '#161b22',
              borderBottom: '1px solid #30363d'
            }}>
              <div style={{display: 'flex', gap: '6px'}}>
                <span style={{width: 12, height: 12, borderRadius: '50%', background: '#ff5f56', display: 'inline-block'}} />
                <span style={{width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block'}} />
                <span style={{width: 12, height: 12, borderRadius: '50%', background: '#27c93f', display: 'inline-block'}} />
              </div>
              <span style={{marginLeft: '1rem', fontSize: '0.8rem', color: '#8b949e', fontFamily: 'var(--ifm-font-family-monospace)'}}>
                quickstart.ts
              </span>
            </div>
            <pre style={{
              margin: 0,
              padding: '1.25rem 1.5rem',
              background: '#0d1117',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              color: '#e6edf3',
              fontFamily: 'var(--ifm-font-family-monospace)',
              overflowX: 'auto'
            }}>
              <code>{`import { createTracklrClient } from '@tracklr/sdk';

// 1. Initialize the client
const tracklr = createTracklrClient({
  baseUrl: 'https://biz.henotaceai.ng/api/',
  clientPlatform: 'web'
});

// 2. Authenticate
const { user, business } = await tracklr.auth.login({
  email: 'admin@tracklr.app',
  password: 'Password123'
});

// 3. Query Retail Products with strict multi-tenant isolation
const products = await tracklr.retail.getProducts({ category: 'Beverages' });

// 4. Record POS sale transaction
const receipt = await tracklr.retail.createSale({
  business_id: business.id,
  items: [{ product_id: products[0].id, quantity: 2, unit_price: 1500, total_price: 3000 }],
  payment_method: 'cash'
});`}</code>
            </pre>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Tracklr SDK Documentation"
      description="Unified TypeScript API Client SDK for Tracklr Business & Production Suite">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
