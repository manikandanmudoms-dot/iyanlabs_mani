# iyanLabs — Digital Experience

Single-page corporate website for iyanLabs (Salesforce Solutions · MuleSoft Integration · Mobile App Development).
Built with **React 19 + TypeScript + Vite**. No animation library is used: all motion is CSS, SVG and
`IntersectionObserver` / `requestAnimationFrame`-driven custom properties.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check (tsc --noEmit) + production build → dist/
npm run preview    # serve the production build
```

Node 18+ (20 LTS recommended).

## Contact form setup

The form validates on the client and never reports a message as sent unless a real endpoint confirms it.

| Mode | When | Behaviour |
|---|---|---|
| Endpoint | `VITE_CONTACT_ENDPOINT` is set | `POST` JSON `{ name, email, company, topic, message, source }`. 2xx → success state; anything else → error state with an email fallback. |
| Email hand-off (default) | No endpoint set | Opens the visitor's email app, addressed to `reachus@iyanlabs.com` with the enquiry pre-filled, and tells them to press send. |

```bash
cp .env.example .env
# then set, for example:
VITE_CONTACT_ENDPOINT=https://formspree.io/f/<your-form-id>
```

Any JSON endpoint will work, such as Formspree, a serverless function or a CRM/MuleSoft lead API. If the endpoint is on another domain, it must allow CORS from the site's domain.

## Structure

```
src/
  content/site.ts            all copy, verified links, service/process/ecosystem data
  styles/tokens.css          design tokens from DESIGN.md (colours, type, radius, spacing, elevation)
  styles/base.css            reset, grid, type scale, eyebrow/pill/reveal utilities, reduced-motion
  hooks/motion.ts            reveal, reversible in-view, scroll-progress, desktop pointer parallax
  lib/contactIntent.ts       lets service CTAs pre-select the enquiry topic
  lib/config.ts              env config
  components/
    layout/                  Header (sticky, mobile menu), Footer
    ui/                      Button / ButtonLink, Logo
    sections/                Hero, Challenge (#approach), Services, Ecosystem, Process, Work, About, Contact
    visuals/                 HeroVisual (connected systems studio), ServiceVisuals (CRM / API / Mobile)
public/
  favicon.svg, og-image.png
```

## Content sources and guardrails

- The contact email (`reachus@iyanlabs.com`), the LinkedIn page, the Varavu destination (`https://iyanlabs.com/products.html`), the practice leadership names and roles, and the "20+ MuleSoft / 20+ Salesforce delivered" counts all come from iyanlabs.com or the official iyanLabs LinkedIn page. All of them are in `src/content/site.ts`, so they're easy to edit or remove.
- The portfolio cards are labelled **Illustrative concept**. The site has no client names, logos, testimonials or invented metrics.
- There are no privacy policy or terms links, because those pages couldn't be verified. When they exist, add them to the footer and the form notice.
- The logo mark is a provisional SVG built from the DESIGN.md palette. Replace `public/favicon.svg` and `components/ui/Logo.tsx` with the approved brand asset.

## Accessibility and motion

- Semantic landmarks, a single `h1`, a skip link and visible focus rings.
- Labelled form controls, with inline errors linked through `aria-describedby` and a live status region.
- The ecosystem diagram works with pointer, keyboard and touch, and every connection also has a text description.
- `prefers-reduced-motion` turns off looping animations and shows the scroll-story visuals in their final state.
- Content is never hidden if JavaScript fails: reveal states only apply after JS adds the `js-motion` class.
