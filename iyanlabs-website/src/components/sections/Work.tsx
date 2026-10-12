import { LINKS, WORK } from '../../content/site';
import { selectContactTopic } from '../../lib/contactIntent';
import { ButtonLink } from '../ui/Button';
import './Work.css';

function VaravuDevices() {
  return (
    <div
      className="vv"
      role="img"
      aria-label="Illustration: Varavu on desktop, tablet and mobile — a billing dashboard with revenue trend and recent invoices, an invoice view, and a payment reminder."
    >
      <div className="vv__desktop" aria-hidden="true">
        <div className="vv__chrome"><i /><i /><i /><span>Varavu · Dashboard</span></div>
        <div className="vv__dash">
          <div className="vv__kpis">
            <div><small>Revenue</small><b className="vv__bar vv__bar--v" /></div>
            <div><small>Paid</small><b className="vv__bar vv__bar--c" /></div>
            <div><small>Due</small><b className="vv__bar vv__bar--o" /></div>
          </div>
          <div className="vv__chart">
            <svg viewBox="0 0 300 90" preserveAspectRatio="none">
              <path d="M0 70 C 40 60, 60 72, 90 55 S 150 30, 180 42 S 240 20, 300 14 V90 H0Z" fill="rgba(118,87,255,0.12)" />
              <path d="M0 70 C 40 60, 60 72, 90 55 S 150 30, 180 42 S 240 20, 300 14" fill="none" stroke="#7657FF" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="vv__table">
            {['Paid', 'Paid', 'Due'].map((s, i) => (
              <div key={i}><span>INV-{208 + i}</span><span className="vv__line" /><em className={s === 'Due' ? 'due' : ''}>{s}</em></div>
            ))}
          </div>
        </div>
      </div>

      <div className="vv__tablet" aria-hidden="true">
        <div className="vv__tab-screen">
          <p className="vv__h">Invoice</p>
          <div className="vv__inv">
            <span className="vv__line" /><span className="vv__line vv__line--s" />
            <div className="vv__inv-rows"><i /><i /><i /></div>
            <div className="vv__inv-total"><span>Total</span><b /></div>
          </div>
          <span className="vv__send">Send invoice</span>
        </div>
      </div>

      <div className="vv__phone" aria-hidden="true">
        <div className="vv__ph-screen">
          <p className="vv__h">Reminders</p>
          <div className="vv__remind"><i />Payment due</div>
          <div className="vv__remind vv__remind--ok"><i />Payment received</div>
          <span className="vv__sync"><i />Synced</span>
        </div>
      </div>
    </div>
  );
}

function ConceptArt({ tone }: { tone: string }) {
  return (
    <div className="concept__art" aria-hidden="true">
      {tone === 'violet' && (
        <div className="ca-flow">
          <span className="ca-chip is-done">Intake</span><i />
          <span className="ca-chip is-done">Diagnose</span><i />
          <span className="ca-chip is-now">Resolve</span>
        </div>
      )}
      {tone === 'cyan' && (
        <div className="ca-sync">
          <span className="ca-box">CRM</span><i />
          <span className="ca-box ca-box--api">API</span><i />
          <span className="ca-box">ERP</span>
        </div>
      )}
      {tone === 'orange' && (
        <div className="ca-phone">
          <span className="ca-row is-done" /><span className="ca-row is-done" /><span className="ca-row" />
          <span className="ca-btn" />
        </div>
      )}
    </div>
  );
}

export function Work() {
  const { varavu, portfolio } = WORK;
  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">{WORK.eyebrow}</p>
          <h2 id="work-title" className="t-headline-lg">{WORK.headline}</h2>
          <p className="t-body-lg">{WORK.body}</p>
        </div>

        <article className="varavu reveal" aria-labelledby="varavu-title">
          <div className="varavu__copy">
            <span className="pill pill--hot">Our own product</span>
            <h3 id="varavu-title" className="varavu__title">
              <span className="varavu__name">{varavu.name}</span>
              <span className="varavu__headline">{varavu.headline}</span>
            </h3>
            <p className="varavu__desc">{varavu.description}</p>
            <ul className="varavu__features">
              {varavu.features.map((f) => (
                <li key={f}><span aria-hidden="true" />{f}</li>
              ))}
            </ul>
            <div className="varavu__ctas">
              <ButtonLink href={LINKS.varavu} target="_blank" icon="external">Explore Varavu</ButtonLink>
              <ButtonLink href="#contact" variant="outline" icon="none" onClick={() => selectContactTopic('Other')}>Ask about Varavu</ButtonLink>
            </div>
          </div>
          <div className="varavu__visual"><VaravuDevices /></div>
        </article>

        <div className="portfolio">
          <div className="portfolio__head reveal">
            <h3 className="t-headline-md">{portfolio.title}</h3>
            <ul className="portfolio__published" aria-label="Published delivery record">
              {portfolio.published.map((p) => (
                <li key={p.label}><b>{p.value}</b>{p.label}</li>
              ))}
            </ul>
          </div>
          <ul className="portfolio__grid">
            {portfolio.items.map((item, i) => (
              <li key={item.title} className={`concept concept--${item.tone} reveal`} style={{ ['--d' as string]: `${i * 90}ms` }}>
                <ConceptArt tone={item.tone} />
                <div className="concept__body">
                  <p className="concept__meta"><span className="t-label">{item.category}</span><span className="concept__badge">Illustrative concept</span></p>
                  <h4 className="t-headline-sm">{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="portfolio__note">{portfolio.note}</p>
        </div>
      </div>
    </section>
  );
}
