import { ABOUT } from '../../content/site';
import './About.css';

const VALUE_ICONS = [
  <path key="0" d="M12 3v4M12 17v4M3 12h4M17 12h4M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />,
  <path key="1" d="M8 7 3 12l5 5M16 7l5 5-5 5M13.5 5l-3 14" />,
  <path key="2" d="M7 10a3 3 0 1 0 0-.01M17 10a3 3 0 1 0 0-.01M3 20c.8-3 2.4-4.5 4-4.5s3.2 1.5 4 4.5M13 20c.8-3 2.4-4.5 4-4.5s3.2 1.5 4 4.5" />,
  <path key="3" d="M4 19 19 4M19 4h-6M19 4v6M4 13v6h6" />,
];

const initials = (name: string) => name.split(' ').map((p) => p[0]).join('').slice(0, 2);

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about__top">
          <div className="section-head reveal">
            <p className="eyebrow">{ABOUT.eyebrow}</p>
            <h2 id="about-title" className="t-headline-lg">{ABOUT.headline}</h2>
            <p className="t-body-lg">{ABOUT.body}</p>
          </div>

          <ul className="about__values">
            {ABOUT.values.map((v, i) => (
              <li key={v.title} className="about__value reveal" style={{ ['--d' as string]: `${i * 80}ms` }}>
                <span className="about__icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{VALUE_ICONS[i]}</svg>
                </span>
                <h3 className="t-headline-sm">{v.title}</h3>
                <p>{v.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="leaders reveal">
          <h3 className="t-label leaders__title">Practice leadership</h3>
          <ul className="leaders__grid">
            {ABOUT.leaders.map((l) => (
              <li key={l.name} className={`leader leader--${l.practice}`}>
                <span className="leader__mark" aria-hidden="true">{initials(l.name)}</span>
                <div>
                  <p className="leader__name">{l.name}</p>
                  <p className="leader__role">{l.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
