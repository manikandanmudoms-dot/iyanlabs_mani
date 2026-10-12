import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { About } from './components/sections/About';
import { Challenge } from './components/sections/Challenge';
import { Contact } from './components/sections/Contact';
import { Ecosystem } from './components/sections/Ecosystem';
import { Hero } from './components/sections/Hero';
import { Process } from './components/sections/Process';
import { Services } from './components/sections/Services';
import { Work } from './components/sections/Work';
import { useGlobalReveal } from './hooks/motion';

export default function App() {
  useGlobalReveal();
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Challenge />
        <Services />
        <Ecosystem />
        <Process />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
