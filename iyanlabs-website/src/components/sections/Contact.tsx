import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { CONTACT, LINKS } from '../../content/site';
import { CONTACT_ENDPOINT } from '../../lib/config';
import { onContactTopic } from '../../lib/contactIntent';
import { Button, ButtonLink } from '../ui/Button';
import './Contact.css';

type Field = 'name' | 'email' | 'company' | 'topic' | 'message';
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
type Status = 'idle' | 'submitting' | 'sent' | 'mailto' | 'error';

const EMPTY: Values = { name: '', email: '', company: '', topic: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!v.email.trim()) e.email = 'Please enter your work email.';
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address, e.g. name@company.com.';
  if (!v.topic) e.topic = 'Please choose what we can help you with.';
  if (v.message.trim().length < 10) e.message = 'Please tell us a little about your project (at least 10 characters).';
  return e;
}

function buildMailto(v: Values) {
  const subject = `Project enquiry: ${v.topic}${v.company ? ` — ${v.company}` : ''}`;
  const body = [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    v.company ? `Company: ${v.company}` : null,
    `Topic: ${v.topic}`,
    '',
    v.message,
  ].filter((l) => l !== null).join('\n');
  return `mailto:${LINKS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function Contact() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [mailto, setMailto] = useState('');
  const [trap, setTrap] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const id = (f: Field) => `${uid}-${f}`;

  useEffect(() => onContactTopic((topic) => {
    setValues((v) => ({ ...v, topic: CONTACT.topics.includes(topic) ? topic : 'Other' }));
    setErrors((e) => ({ ...e, topic: undefined }));
  }), []);

  const onChange = (f: Field) => (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = ev.target.value;
    setValues((v) => ({ ...v, [f]: value }));
    if (errors[f]) setErrors((e) => ({ ...e, [f]: validate({ ...values, [f]: value })[f] }));
    if (status !== 'idle' && status !== 'submitting') setStatus('idle');
  };

  const onBlur = (f: Field) => () => {
    if (f === 'company') return;
    const err = validate(values)[f];
    setErrors((e) => ({ ...e, [f]: values[f] ? err : e[f] }));
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (status === 'submitting') return;
    if (trap) return; // bot honeypot

    const errs = validate(values);
    setErrors(errs);
    const first = (Object.keys(errs) as Field[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`)?.focus();
      return;
    }

    const link = buildMailto(values);
    setMailto(link);

    if (!CONTACT_ENDPOINT) {
      // No backend configured: hand off to the visitor's email app. Never claim delivery.
      setStatus('mailto');
      window.location.href = link;
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, source: 'iyanlabs.com' }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('sent');
      setValues(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  const describedBy = (f: Field, hint?: boolean) => [hint ? `${id(f)}-hint` : '', errors[f] ? `${id(f)}-err` : ''].filter(Boolean).join(' ') || undefined;

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__frame">
          <svg className="contact__paths" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d="M0 36 H300 C 336 36, 336 12, 372 12 H640" />
            <path d="M1200 560 H940 C 904 560, 904 588, 868 588 H620" />
          </svg>
          <span className="contact__focal" aria-hidden="true" />

          <div className="contact__intro">
            <p className="eyebrow">{CONTACT.eyebrow}</p>
            <h2 id="contact-title" className="t-headline-lg">{CONTACT.headline}</h2>
            <p className="t-body-lg">{CONTACT.body}</p>
            <ul className="contact__direct">
              <li>
                <span className="t-label">Email</span>
                <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
              </li>
              <li>
                <span className="t-label">LinkedIn</span>
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">iyanLabs on LinkedIn<span className="sr-only"> (opens in a new tab)</span></a>
              </li>
            </ul>
            <ButtonLink href="#services" variant="outline" icon="none">Explore Our Services</ButtonLink>
          </div>

          <form ref={formRef} className="cform" noValidate onSubmit={onSubmit} aria-labelledby="contact-title" aria-busy={status === 'submitting'}>
            <div className="cform__grid">
              <div className={`field${errors.name ? ' has-error' : ''}`}>
                <label htmlFor={id('name')}>Your name <span aria-hidden="true">*</span></label>
                <input id={id('name')} name="name" type="text" autoComplete="name" required aria-required="true"
                  aria-invalid={!!errors.name} aria-describedby={describedBy('name')}
                  value={values.name} onChange={onChange('name')} onBlur={onBlur('name')} />
                {errors.name && <p className="field__err" id={`${id('name')}-err`}>{errors.name}</p>}
              </div>

              <div className={`field${errors.email ? ' has-error' : ''}`}>
                <label htmlFor={id('email')}>Work email <span aria-hidden="true">*</span></label>
                <input id={id('email')} name="email" type="email" inputMode="email" autoComplete="email" required aria-required="true"
                  aria-invalid={!!errors.email} aria-describedby={describedBy('email')}
                  value={values.email} onChange={onChange('email')} onBlur={onBlur('email')} />
                {errors.email && <p className="field__err" id={`${id('email')}-err`}>{errors.email}</p>}
              </div>

              <div className="field">
                <label htmlFor={id('company')}>Company <span className="field__opt">(optional)</span></label>
                <input id={id('company')} name="company" type="text" autoComplete="organization"
                  value={values.company} onChange={onChange('company')} />
              </div>

              <div className={`field${errors.topic ? ' has-error' : ''}`}>
                <label htmlFor={id('topic')}>What can we help you with? <span aria-hidden="true">*</span></label>
                <div className="field__select">
                  <select id={id('topic')} name="topic" required aria-required="true"
                    aria-invalid={!!errors.topic} aria-describedby={describedBy('topic')}
                    value={values.topic} onChange={onChange('topic')} onBlur={onBlur('topic')}>
                    <option value="" disabled>Select a service</option>
                    {CONTACT.topics.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                {errors.topic && <p className="field__err" id={`${id('topic')}-err`}>{errors.topic}</p>}
              </div>

              <div className={`field field--full${errors.message ? ' has-error' : ''}`}>
                <label htmlFor={id('message')}>Tell us about your project <span aria-hidden="true">*</span></label>
                <textarea id={id('message')} name="message" rows={5} required aria-required="true"
                  aria-invalid={!!errors.message} aria-describedby={describedBy('message', true)}
                  value={values.message} onChange={onChange('message')} onBlur={onBlur('message')} />
                <p className="field__hint" id={`${id('message')}-hint`}>Goals, systems involved, timelines — whatever helps us understand the challenge.</p>
                {errors.message && <p className="field__err" id={`${id('message')}-err`}>{errors.message}</p>}
              </div>

              <div className="cform__trap" aria-hidden="true">
                <label htmlFor={id('company') + '-web'}>Leave this field empty</label>
                <input id={id('company') + '-web'} tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
              </div>
            </div>

            <div className="cform__foot">
              <Button type="submit" size="lg" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Start a Conversation'}
              </Button>
              <p className="cform__privacy">
                <span aria-hidden="true">*</span> Required. The details you share are used to respond to your enquiry.
              </p>
            </div>

            <div className="cform__status" role="status" aria-live="polite">
              {status === 'sent' && (
                <p className="msg msg--ok"><strong>Thank you — your message has been sent.</strong> We'll be in touch soon.</p>
              )}
              {status === 'mailto' && (
                <p className="msg msg--info">
                  <strong>Your email app should now open with your message ready to send.</strong> Please press send to reach us.
                  If nothing opened, <a href={mailto}>try again</a> or email <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>.
                </p>
              )}
              {status === 'error' && (
                <p className="msg msg--err" role="alert">
                  <strong>Sorry, we couldn't send your message.</strong> Please try again, or <a href={mailto}>send it by email</a> instead.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
