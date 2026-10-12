import { usePointerParallax } from '../../hooks/motion';
import './HeroVisual.css';

/**
 * "The iyanLabs Connected Systems Studio" — a CRM workspace, an API layer and a
 * mobile app, built in HTML/SVG and connected by animated data pathways.
 */
export function HeroVisual() {
  const ref = usePointerParallax<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="studio"
      role="img"
      aria-label="Illustration: a CRM workspace, an API integration layer and a mobile business app, connected by live data pathways."
    >
      <div className="studio__grid" aria-hidden="true" />

      <svg className="studio__paths" viewBox="0 0 600 620" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="hp-v" x1="0" x2="1"><stop offset="0" stopColor="#7657FF" /><stop offset="1" stopColor="#06B6D4" /></linearGradient>
        </defs>
        {/* CRM → API */}
        <path className="studio__path studio__path--a" d="M150 262 C 150 330, 120 360, 150 418" />
        {/* API → Mobile */}
        <path className="studio__path studio__path--b" d="M354 470 C 380 470, 380 400, 398 400" />
        {/* CRM → Mobile */}
        <path className="studio__path studio__path--c" d="M384 110 C 440 110, 480 104, 480 136" />
        <path className="studio__flow studio__flow--a" d="M150 262 C 150 330, 120 360, 150 418" />
        <path className="studio__flow studio__flow--b" d="M354 470 C 380 470, 380 400, 398 400" />
        <path className="studio__flow studio__flow--c" d="M384 110 C 440 110, 480 104, 480 136" />
      </svg>

      <span className="studio__node studio__node--1" aria-hidden="true" />
      <span className="studio__node studio__node--2" aria-hidden="true" />
      <span className="studio__node studio__node--3" aria-hidden="true" />

      {/* CRM workspace */}
      <div className="studio__layer studio__crm" aria-hidden="true">
        <div className="panel panel--crm">
          <div className="panel__bar">
            <span className="panel__title">Customer workspace</span>
            <span className="pill pill--live">Live</span>
          </div>
          <div className="crm-stages">
            <span className="is-done">Lead</span>
            <span className="is-done">Qualified</span>
            <span className="is-active">Proposal</span>
            <span>Won</span>
          </div>
          <ul className="crm-rows">
            <li><i className="av av--v" />Retail account<em>Opportunity</em></li>
            <li><i className="av av--c" />Logistics account<em className="em--c">Synced</em></li>
            <li><i className="av av--o" />Service case<em className="em--o">Action</em></li>
          </ul>
        </div>
      </div>

      {/* API layer */}
      <div className="studio__layer studio__api" aria-hidden="true">
        <div className="panel panel--dark">
          <div className="panel__bar">
            <span className="panel__title">API layer</span>
            <span className="api-status"><i />Healthy</span>
          </div>
          <div className="api-topo">
            <span className="api-chip">Experience</span>
            <span className="api-line" />
            <span className="api-chip api-chip--mid">Process</span>
            <span className="api-line" />
            <span className="api-chip">System</span>
          </div>
          <div className="api-targets"><span>CRM</span><span>ERP</span><span>DB</span><span>Cloud</span></div>
        </div>
      </div>

      {/* Mobile app */}
      <div className="studio__layer studio__phone" aria-hidden="true">
        <div className="device">
          <div className="device__screen">
            <div className="device__notch" />
            <div className="app">
              <div className="app__head"><span>Today</span><i className="app__dot" /></div>
              <div className="app__card app__card--violet">
                <small>Field visit</small>
                <strong>3 tasks</strong>
                <div className="app__bar"><i /></div>
              </div>
              <div className="app__list">
                <span><i className="ok" />Visit logged</span>
                <span><i className="ok" />Stock checked</span>
                <span><i />Confirm order</span>
              </div>
              <div className="app__btn">Confirm order</div>
            </div>
          </div>
        </div>
      </div>

      <div className="studio__layer studio__toast" aria-hidden="true">
        <span className="toast"><i />Order synced to CRM</span>
      </div>
    </div>
  );
}
