import { FOOTER, LINKS, SERVICES } from '../../content/site';
import { Logo } from '../ui/Logo';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#top" aria-label="iyanLabs — back to top" className="footer__logo"><Logo inverse /></a>
            <p className="footer__tagline">{FOOTER.tagline}</p>
            <p className="footer__desc">{FOOTER.description}</p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            <div>
              <h2 className="t-label">Services</h2>
              <ul>{SERVICES.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.name}</a></li>)}</ul>
            </div>
            <div>
              <h2 className="t-label">Explore</h2>
              <ul>
                <li><a href="#approach">Our Approach</a></li>
                <li><a href="#work">Our Work</a></li>
                <li><a href="#about">About</a></li>
              </ul>
            </div>
            <div>
              <h2 className="t-label">Connect</h2>
              <ul>
                <li><a href="#contact">Contact</a></li>
                <li><a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<span className="sr-only"> (opens in a new tab)</span></a></li>
                <li><a href={`mailto:${LINKS.email}`}>{LINKS.email}</a></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer__bottom">
          <p>© {year} iyanLabs. All rights reserved.</p>
          <p className="footer__motto">Understand. Connect. Build. Deliver.</p>
        </div>
      </div>
    </footer>
  );
}
