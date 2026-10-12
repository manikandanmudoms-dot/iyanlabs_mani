import { PROCESS } from '../../content/site';
import { useScrollProgress } from '../../hooks/motion';
import './Process.css';

export function Process() {
  const ref = useScrollProgress<HTMLOListElement>('--progress', 0.85, 0.5);

  return (
    <section className="section process" id="process" aria-labelledby="process-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">{PROCESS.eyebrow}</p>
          <h2 id="process-title" className="t-headline-lg">{PROCESS.headline}</h2>
        </div>

        <ol ref={ref} className="timeline">
          <li className="timeline__track" aria-hidden="true"><span className="timeline__fill" /></li>
          {PROCESS.steps.map((s, i) => (
            <li key={s.number} className="timeline__step" style={{ ['--i' as string]: i, ['--at' as string]: (i / (PROCESS.steps.length - 1)).toFixed(3) }}>
              <span className="timeline__marker" aria-hidden="true">{s.number}</span>
              <div className="timeline__body">
                <h3 className="t-headline-sm"><span className="sr-only">Step {s.number}: </span>{s.title}</h3>
                <p>{s.description}</p>
                <p className="timeline__deliverable"><span className="t-label">Outcome</span>{s.deliverable}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
