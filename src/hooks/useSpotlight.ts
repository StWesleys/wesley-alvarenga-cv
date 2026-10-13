import { useEffect, type RefObject } from 'react';

/** Faz a camada seguir o ponteiro via --x/--y (ignora toque). */
export function useSpotlight(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el || e.pointerType === 'touch') return;
      el.style.setProperty('--x', e.clientX + 'px');
      el.style.setProperty('--y', e.clientY + 'px');
      el.style.opacity = '1';
    };
    const onLeave = () => { if (ref.current) ref.current.style.opacity = '0'; };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [ref]);
}
