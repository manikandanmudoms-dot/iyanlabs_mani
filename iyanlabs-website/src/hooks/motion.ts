import { useEffect, useRef, useState } from 'react';

/** True when the user asked the OS to reduce motion. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/**
 * Adds `is-visible` to every `.reveal` element as it enters the viewport.
 * Content stays visible without JS because the hidden state is gated on `.js-motion`.
 */
export function useGlobalReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (!('IntersectionObserver' in window)) return;
    root.classList.add('js-motion');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    const scan = () => document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el));
    scan();
    // Safety net: never leave content hidden if the observer misses something.
    const t = window.setTimeout(() => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible')), 4000);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, []);
}

/** Reversible in-view state for story visuals (toggles when scrolling back). */
export function useInView<T extends Element>(threshold = 0.35) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/**
 * Scroll progress (0 → 1) of an element moving through the viewport,
 * written to a CSS custom property to avoid React re-renders on scroll.
 */
export function useScrollProgress<T extends HTMLElement>(cssVar = '--progress', start = 0.8, end = 0.35) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const from = vh * start;
      const to = vh * end - r.height;
      const p = Math.min(1, Math.max(0, (from - r.top) / (from - to)));
      el.style.setProperty(cssVar, p.toFixed(4));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [cssVar, start, end]);
  return ref;
}

/** Desktop-only pointer parallax; writes --px / --py (-1 → 1) to the element. */
export function usePointerParallax<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1025px)');
    if (!fine.matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => { frame = 0; el.style.setProperty('--px', x.toFixed(3)); el.style.setProperty('--py', y.toFixed(3)); };
    const onMove = (ev: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = ((ev.clientX - r.left) / r.width - 0.5) * 2;
      y = ((ev.clientY - r.top) / r.height - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => { x = 0; y = 0; if (!frame) frame = requestAnimationFrame(apply); };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);
  return ref;
}
