import { CHALLENGE } from '../../content/site';
import { useScrollProgress } from '../../hooks/motion';
import './Challenge.css';

const FRAGMENTS = [
  { label: 'CRM', tone: 'violet', dx: -46, dy: -30, rot: -9 },
  { label: 'Spreadsheets', tone: 'slate', dx: 38, dy: -46, rot: 7 },
  { label: 'Email threads', tone: 'slate', dx: 62, dy: 18, rot: 11 },
  { label: 'Orders', tone: 'orange', dx: -58, dy: 34, rot: 6 },
  { label: 'Reports', tone: 'slate', dx: 20, dy: 56, rot: -8 },
  { label: 'Mobile', tone: 'cyan', dx: 52, dy: 40, rot: -12 },
];

const ICONS = [
  <path key="a" d="M4 7h6v6H4zM14 11h6v6h-6zM10 10h4" />,
  <path key="b" d="M4 6h16M4 12h10M4 18h6M17 15l3 3-3 3" />,
  <path key="c" d="M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2" />,
];

export function Challenge() {
  const stageRef = useScrollProgress<HTMLDivElement>('--progress', 0.95, 0.55);

  return (
    <section className="section challenge" id="approach" aria-labelledby="challenge-title">
      <div className="container challenge__inner">
        <div className="challenge__copy">
          <div className="section-head reveal">
            <p className="eyebrow">{CHALLENGE.eyebrow}</p>
            <h2 id="challenge-title" className="t-headline-lg">{CHALLENGE.headline}</h2>
            <p className="t-body-lg">{CHALLENGE.body}</p>
          </div>

          <ol className="challenge__cards">
            {CHALLENGE.cards.map((c, i) => (
              <li key={c.title} className="challenge__card reveal" style={{ ['--d' as string]: `${i * 90}ms` }}>
                <span className="challenge__icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{ICONS[i]}</svg>
                </span>
                <div>
                  <h3 className="t-headline-sm">{c.title}</h3>
                  <p className="t-body-sm">{c.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div ref={stageRef} className="fragments" role="img" aria-label="Illustration: scattered business tools — CRM, spreadsheets, email, orders, reports and mobile — move into alignment and connect as one workspace.">
          <div className="fragments__frame" aria-hidden="true">
            <span className="fragments__state fragments__state--before">Disconnected</span>
            <span className="fragments__state fragments__state--after">Connected workspace</span>
          </div>
          <svg className="fragments__links" viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden="true">
            <path d="M41 41H259M41 159H259M41 41V159M150 41V159M259 41V159" />
          </svg>
          <div className="fragments__grid" aria-hidden="true">
            {FRAGMENTS.map((f) => (
              <div
                key={f.label}
                className={`frag frag--${f.tone}`}
                style={{ ['--dx' as string]: `${f.dx}px`, ['--dy' as string]: `${f.dy}px`, ['--rot' as string]: `${f.rot}deg` }}
              >
                <span className="frag__label">{f.label}</span>
                <span className="frag__line" />
                <span className="frag__line frag__line--short" />
                <i className="frag__dot" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
