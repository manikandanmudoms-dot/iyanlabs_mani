import { useState } from 'react';
import { ECOSYSTEM, type NodeId } from '../../content/site';
import { useInView } from '../../hooks/motion';
import './Ecosystem.css';

const POS: Record<NodeId, { x: number; y: number }> = {
  salesforce: { x: 15, y: 24 },
  business: { x: 15, y: 76 },
  mulesoft: { x: 50, y: 50 },
  mobile: { x: 85, y: 50 },
};

const EDGE_TAGS = ['Customer data', 'Orders & inventory', 'Secure APIs'];
const nameOf = (id: NodeId) => ECOSYSTEM.nodes.find((n) => n.id === id)!.name;

export function Ecosystem() {
  const [selected, setSelected] = useState<NodeId>('mulesoft');
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const node = ECOSYSTEM.nodes.find((n) => n.id === selected)!;
  const related = ECOSYSTEM.connections.filter((c) => c.from === selected || c.to === selected);

  return (
    <section className="section eco" id="ecosystem" aria-labelledby="eco-title">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <p className="eyebrow eyebrow--dark">{ECOSYSTEM.eyebrow}</p>
          <h2 id="eco-title" className="t-headline-lg">{ECOSYSTEM.headline}</h2>
          <p className="t-body-lg">{ECOSYSTEM.body}</p>
        </div>

        <div ref={ref} className={`eco__board${inView ? ' is-active' : ''}`}>
          <div className="eco__diagram">
            <svg className="eco__edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              {ECOSYSTEM.connections.map((c, i) => {
                const a = POS[c.from];
                const b = POS[c.to];
                const on = c.from === selected || c.to === selected;
                const d = `M${a.x} ${a.y} C ${(a.x + b.x) / 2} ${a.y}, ${(a.x + b.x) / 2} ${b.y}, ${b.x} ${b.y}`;
                return (
                  <g key={i} className={on ? 'is-on' : ''}>
                    <path className="eco__edge" d={d} />
                    <path className="eco__edge-flow" d={d} style={{ ['--i' as string]: i }} />
                  </g>
                );
              })}
            </svg>

            {ECOSYSTEM.connections.map((c, i) => {
              const a = POS[c.from];
              const b = POS[c.to];
              return (
                <span key={i} className="eco__tag" aria-hidden="true" style={{ left: `${(a.x + b.x) / 2}%`, top: `${(a.y + b.y) / 2}%` }}>
                  {EDGE_TAGS[i]}
                </span>
              );
            })}

            <ul className="eco__nodes" aria-label="Systems in the connected ecosystem">
              {ECOSYSTEM.nodes.map((n, i) => (
                <li key={n.id} className={`eco__node-wrap eco__node-wrap--${n.id}`} style={{ left: `${POS[n.id].x}%`, top: `${POS[n.id].y}%`, ['--i' as string]: i }}>
                  <button
                    type="button"
                    className={`eco__node eco__node--${n.tone}`}
                    aria-pressed={selected === n.id}
                    aria-controls="eco-detail"
                    onClick={() => setSelected(n.id)}
                    onMouseEnter={() => setSelected(n.id)}
                    onFocus={() => setSelected(n.id)}
                  >
                    <span className="eco__glyph" aria-hidden="true">{n.glyph}</span>
                    <span className="eco__node-text">
                      <span className="eco__node-name">{n.name}</span>
                      <span className="eco__node-role">{n.role}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <aside id="eco-detail" className="eco__detail" aria-live="polite">
            <p className="t-label eco__detail-label">Selected system</p>
            <h3 className={`t-headline-md eco__detail-title eco__detail-title--${node.tone}`}>{node.name}</h3>
            <p className="eco__detail-role">{node.role}</p>
            <p className="t-label eco__detail-label">Connections</p>
            <ul className="eco__detail-list">
              {related.map((c) => (
                <li key={c.from + c.to}>
                  <span className="eco__pair">{nameOf(c.from)} <span aria-hidden="true">⇄</span><span className="sr-only">connects with</span> {nameOf(c.to)}</span>
                  <span>{c.text}</span>
                </li>
              ))}
            </ul>
            <p className="eco__hint">Select a system to explore how it connects.</p>
          </aside>
        </div>

        <ol className="eco__summary reveal" aria-label="How the systems connect">
          {ECOSYSTEM.connections.map((c) => (
            <li key={c.from + c.to}>
              <strong>{nameOf(c.from)} → {nameOf(c.to)}</strong>
              <span>{c.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
