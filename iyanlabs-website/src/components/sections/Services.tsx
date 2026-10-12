import { SERVICES, SERVICES_INTRO, type Service } from '../../content/site';
import { useInView } from '../../hooks/motion';
import { selectContactTopic } from '../../lib/contactIntent';
import { ButtonLink } from '../ui/Button';
import { ApiVisual, CrmVisual, MobileVisual } from '../visuals/ServiceVisuals';
import './Services.css';

const VISUALS = { salesforce: CrmVisual, mulesoft: ApiVisual, mobile: MobileVisual } as const;

function ServicePanel({ service }: { service: Service }) {
  const [ref, inView] = useInView<HTMLElement>(0.3);
  const Visual = VISUALS[service.id];
  const dark = service.id === 'mulesoft';

  return (
    <article
      ref={ref}
      id={service.id}
      className={`svc svc--${service.id}${dark ? ' svc--dark' : ''}`}
      aria-labelledby={`${service.id}-title`}
    >
      <div className="svc__visual reveal">
        <span className={`svc__visual-tag pill ${dark ? 'pill--live' : 'pill--violet'}`}>{service.visualLabel}</span>
        <Visual active={inView} />
      </div>

      <div className="svc__content">
        <div className="svc__head reveal">
          <p className="svc__kicker"><span className="svc__num">{service.number}</span>{service.name}</p>
          <h3 id={`${service.id}-title`} className="t-headline-lg svc__title">{service.headline}</h3>
          <p className="svc__desc">{service.description}</p>
        </div>

        <div className="svc__caps reveal" style={{ ['--d' as string]: '80ms' }}>
          <h4 className="t-label svc__caps-title">Capabilities</h4>
          <ul>
            {service.capabilities.map((c) => (
              <li key={c}>
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="svc__value reveal" style={{ ['--d' as string]: '140ms' }}>
          <p className="t-label">Business value</p>
          <p>{service.value}</p>
        </div>

        <div className="reveal" style={{ ['--d' as string]: '200ms' }}>
          <ButtonLink
            href="#contact"
            variant={dark ? 'primary' : 'brand'}
            onClick={() => selectContactTopic(service.topic)}
          >
            {service.cta}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="services__intro reveal">
          <div className="section-head">
            <p className="eyebrow">{SERVICES_INTRO.eyebrow}</p>
            <h2 id="services-title" className="t-headline-lg">{SERVICES_INTRO.headline}</h2>
          </div>
          <p className="t-body-lg services__intro-body">{SERVICES_INTRO.body}</p>
        </div>

        <div className="services__list">
          {SERVICES.map((s) => <ServicePanel key={s.id} service={s} />)}
        </div>
      </div>
    </section>
  );
}
