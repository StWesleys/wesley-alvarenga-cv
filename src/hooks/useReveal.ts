import { useLayoutEffect, type RefObject } from 'react';

const COUNT_MS = 1100;
const STAGGER_MS = 90;

interface CountNode extends Text { __last?: string }

/** Anima os dígitos de cada nó de texto do elemento até o valor original. */
function countUp(el: Element) {
  const nodes: CountNode[] = [];
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) if (/\d/.test(w.currentNode.nodeValue ?? '')) nodes.push(w.currentNode as CountNode);
  nodes.forEach(n => {
    const orig = n.nodeValue ?? '', t0 = performance.now();
    const step = (now: number) => {
      // o React trocou o texto (ex.: troca de idioma): para de animar
      if (n.nodeValue !== orig && n.__last !== n.nodeValue) return;
      const p = Math.min(1, (now - t0) / COUNT_MS), e = 1 - Math.pow(1 - p, 3);
      const v = p >= 1 ? orig : orig.replace(/\d+/g, m => {
        const x = +m, from = m.length === 4 ? x - 15 : 0;
        return String(Math.round(from + (x - from) * e)).padStart(m.length, '0');
      });
      n.nodeValue = v; n.__last = v;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

/**
 * Animação de entrada das seções: cada filho direto (ou cada item, se o filho
 * for uma grade com mais de 2 itens) surge uma vez ao entrar na tela, e os
 * elementos com `data-count` contam até o valor final.
 */
export function useReveal(sections: RefObject<HTMLElement>[], active: boolean, reduce: boolean) {
  useLayoutEffect(() => {
    if (!active || reduce) return;
    if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;

    const items = sections.flatMap(ref => {
      const sec = ref.current;
      if (!sec) return [];
      return [...sec.children].flatMap(el =>
        el.children.length > 2 && getComputedStyle(el).display === 'grid' ? [...el.children] : [el]);
    });

    const anims = new Map<Element, Animation>();
    items.forEach(el => {
      const a = el.animate(
        [{ opacity: 0, transform: 'translateY(28px)', filter: 'blur(6px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }],
        { duration: 800, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' },
      );
      a.pause();
      anims.set(el, a);
    });

    const timers: number[] = [];
    let batch = 0, bt = 0;
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        io.unobserve(el);
        const d = batch++ * STAGGER_MS;
        clearTimeout(bt);
        bt = window.setTimeout(() => { batch = 0; }, 120);
        timers.push(window.setTimeout(() => {
          anims.get(el)?.play();
          el.querySelectorAll('[data-count]').forEach(countUp);
          if (el instanceof HTMLElement && el.dataset.count) countUp(el);
        }, d));
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(el => io.observe(el));

    return () => {
      io.disconnect();
      clearTimeout(bt);
      timers.forEach(clearTimeout);
      anims.forEach(a => a.cancel());
    };
    // as refs são estáveis; reexecuta só quando a visão normal é montada
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduce]);
}
