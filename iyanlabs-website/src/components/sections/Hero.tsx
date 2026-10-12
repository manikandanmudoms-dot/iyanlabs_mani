import { HERO, SERVICES } from '../../content/site';
import { ButtonLink } from '../ui/Button';
import { HeroVisual } from '../visuals/HeroVisual';
import './Hero.css';

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__bg blueprint" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow hero__in" style={{ ['--d' as string]: '0ms' }}>{HERO.eyebrow}</p>
          <h1 id="hero-title" className="t-display hero__title hero__in" style={{ ['--d' as string]: '60ms' }}>
            We Build <span className="hero__accent">Different.</span>
          </h1>
          <p className="hero__support hero__in" style={{ ['--d' as string]: '120ms' }}>{HERO.support}</p>
          <p className="t-body-lg hero__body hero__in" style={{ ['--d' as string]: '180ms' }}>{HERO.body}</p>
          <div className="hero__ctas hero__in" style={{ ['--d' as string]: '240ms' }}>
            <ButtonLink href="#contact" size="lg">Discuss Your Project</ButtonLink>
            <ButtonLink href="#services" size="lg" variant="outline" icon="none">Explore Our Services</ButtonLink>
          </div>
          <p className="hero__trust hero__in" style={{ ['--d' as string]: '300ms' }}>{HERO.trust}</p>
        </div>

        <div className="hero__visual">
          <HeroVisual />
        </div>
      </div>

      <div className="container">
        <ul className="hero__strip" aria-label="Our capabilities">
          {SERVICES.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={`hero__cap hero__cap--${s.id}`}>
                <span className="hero__cap-num">{s.number}</span>
                <span className="hero__cap-name">{s.name}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v9M4.5 8.5 8 12l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
