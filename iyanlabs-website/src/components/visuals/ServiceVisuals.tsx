import type { ReactNode } from 'react';
import './ServiceVisuals.css';

interface VisualProps { active: boolean; }

/* ------------------------------------------------------------------ */
/* 01 · The Customer Command Center                                    */
/* ------------------------------------------------------------------ */
export function CrmVisual({ active }: VisualProps) {
  return (
    <div
      className={`crmv${active ? ' is-active' : ''}`}
      role="img"
      aria-label="Illustration: a CRM workspace where a lead progresses to an opportunity and then a customer, alongside account details, service activity and reusable interface modules."
    >
      <div className="crmv__window" aria-hidden="true">
        <div className="crmv__chrome"><i /><i /><i /><span>Customer workspace</span></div>
        <div className="crmv__body">
          <aside className="crmv__side">
            <span className="is-on" /><span /><span /><span />
          </aside>
          <div className="crmv__main">
            <div className="crmv__flow">
              {['Lead', 'Opportunity', 'Customer'].map((s, i) => (
                <div key={s} className="crmv__step" style={{ ['--i' as string]: i }}>
                  <span className="crmv__step-dot">{i + 1}</span>
                  <span className="crmv__step-name">{s}</span>
                </div>
              ))}
              <span className="crmv__flow-line"><i /></span>
            </div>

            <div className="crmv__mods">
              <div className="crmv__mod crmv__mod--account" style={{ ['--i' as string]: 0 }}>
                <span className="crmv__mod-label">Account</span>
                <strong>Retail customer</strong>
                <div className="crmv__kv"><span>Owner</span><b>Sales team</b></div>
                <div className="crmv__kv"><span>Region</span><b>South</b></div>
              </div>
              <div className="crmv__mod crmv__mod--stage" style={{ ['--i' as string]: 1 }}>
                <span className="crmv__mod-label">Opportunity stage</span>
                <div className="crmv__bars"><i /><i /><i className="hot" /><i /></div>
                <span className="crmv__next">Next step: proposal review</span>
              </div>
              <div className="crmv__mod crmv__mod--service" style={{ ['--i' as string]: 2 }}>
                <span className="crmv__mod-label">Service activity</span>
                <ul>
                  <li><i className="c" />Case resolved</li>
                  <li><i className="v" />Follow-up scheduled</li>
                </ul>
              </div>
              <div className="crmv__mod crmv__mod--lwc" style={{ ['--i' as string]: 3 }}>
                <span className="crmv__mod-label">Reusable components</span>
                <div className="crmv__chips"><span>Record card</span><span>Guided flow</span><span>Timeline</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 02 · The Connected Systems Network                                  */
/* ------------------------------------------------------------------ */
const SOURCES = [
  { y: 70, label: 'CRM' },
  { y: 190, label: 'ERP' },
  { y: 310, label: 'Database' },
];
const DESTS = [
  { y: 110, label: 'Mobile app' },
  { y: 270, label: 'Cloud services' },
];
const LAYERS = [
  { x: 176, w: 124, label: 'System API' },
  { x: 336, w: 124, label: 'Process API' },
  { x: 496, w: 144, label: 'Experience API' },
];

export function ApiVisual({ active }: VisualProps) {
  const paths = [
    ...SOURCES.map((s) => `M140 ${s.y} C 160 ${s.y}, 156 190, 176 190`),
    'M300 190 L336 190',
    'M460 190 L496 190',
    ...DESTS.map((d) => `M640 190 C 656 190, 650 ${d.y}, 666 ${d.y}`),
  ];

  return (
    <div
      className={`apiv${active ? ' is-active' : ''}`}
      role="img"
      aria-label="Illustration: CRM, ERP and database systems send data through system, process and experience API layers to a mobile app and cloud services."
    >
      <svg className="apiv__svg" viewBox="0 0 800 380" aria-hidden="true" focusable="false">
        <rect className="apiv__backbone" x="160" y="120" width="496" height="140" rx="16" />
        <text className="apiv__backbone-label" x="176" y="144">API-LED CONNECTIVITY LAYER</text>

        {paths.map((d, i) => (
          <g key={d}>
            <path className="apiv__path" d={d} pathLength={100} style={{ ['--i' as string]: i }} />
            <path className="apiv__packet" d={d} pathLength={100} style={{ ['--i' as string]: i }} />
          </g>
        ))}

        {SOURCES.map((s) => (
          <g key={s.label} className="apiv__node">
            <rect x="20" y={s.y - 22} width="120" height="44" rx="8" />
            <circle cx="40" cy={s.y} r="4" className="apiv__live" />
            <text x="54" y={s.y + 5}>{s.label}</text>
          </g>
        ))}

        {LAYERS.map((l, i) => (
          <g key={l.label} className="apiv__layer" style={{ ['--i' as string]: i }}>
            <rect x={l.x} y="164" width={l.w} height="52" rx="8" />
            <text x={l.x + l.w / 2} y="195" textAnchor="middle">{l.label}</text>
          </g>
        ))}

        {DESTS.map((d) => (
          <g key={d.label} className="apiv__node apiv__node--dest">
            <rect x="666" y={d.y - 22} width="126" height="44" rx="8" />
            <text x="729" y={d.y + 5} textAnchor="middle">{d.label}</text>
          </g>
        ))}
      </svg>

      {/* Compact vertical version for small screens */}
      <ol className="apiv__stack" aria-hidden="true">
        <li className="apiv__row apiv__row--src"><span>CRM</span><span>ERP</span><span>Database</span></li>
        <li className="apiv__row apiv__row--api"><span>System API</span></li>
        <li className="apiv__row apiv__row--api"><span>Process API</span></li>
        <li className="apiv__row apiv__row--api"><span>Experience API</span></li>
        <li className="apiv__row apiv__row--dst"><span>Mobile app</span><span>Cloud services</span></li>
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 03 · Business in Your Pocket                                        */
/* ------------------------------------------------------------------ */
function Phone({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`mph ${className}`}>
      <div className="mph__screen">
        <span className="mph__notch" />
        {children}
      </div>
    </div>
  );
}

export function MobileVisual({ active }: VisualProps) {
  return (
    <div
      className={`mobv${active ? ' is-active' : ''}`}
      role="img"
      aria-label="Illustration: three phones showing a business dashboard, a field-service task workflow that ends in a completed order, and an order list."
    >
      <div className="mobv__stage" aria-hidden="true">
        <Phone className="mph--side mph--left">
          <div className="mscr">
            <p className="mscr__h">Dashboard</p>
            <div className="mscr__tiles"><span className="v" /><span className="c" /></div>
            <div className="mscr__chart">{[40, 62, 48, 75, 58, 86].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
            <div className="mscr__row" /><div className="mscr__row" />
          </div>
        </Phone>

        <Phone className="mph--hero">
          <div className="mscr mscr--cycle mscr--a">
            <p className="mscr__h">Good morning</p>
            <div className="mscr__card"><small>Today's visits</small><strong>4 scheduled</strong></div>
            <div className="mscr__chart">{[30, 54, 42, 70, 60, 82].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
            <div className="mscr__row" /><div className="mscr__row" />
          </div>
          <div className="mscr mscr--cycle mscr--b">
            <p className="mscr__h">Site visit</p>
            <ul className="mscr__tasks">
              <li className="done"><i />Check in</li>
              <li className="done"><i />Capture photos</li>
              <li className="now"><i />Confirm order</li>
            </ul>
            <span className="mscr__cta">Submit order</span>
          </div>
          <div className="mscr mscr--cycle mscr--c">
            <div className="mscr__success">
              <span className="mscr__tick"><svg viewBox="0 0 24 24" width="28" height="28"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              <strong>Order confirmed</strong>
              <small>Synced to back office</small>
            </div>
          </div>
        </Phone>

        <Phone className="mph--side mph--right">
          <div className="mscr">
            <p className="mscr__h">Orders</p>
            {['Pending', 'Packed', 'Shipped', 'Delivered'].map((s, i) => (
              <div key={s} className="mscr__order"><span>#{1042 + i}</span><em className={i === 0 ? 'o' : ''}>{s}</em></div>
            ))}
          </div>
        </Phone>
      </div>
    </div>
  );
}
