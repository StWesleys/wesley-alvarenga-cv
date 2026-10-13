import { useEffect, useState } from 'react';

const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 1800;
const START_MS = 400;

/** Digita e apaga cada item de `words` em loop. Reinicia quando a lista muda. */
export function useTypewriter(words: string[], disabled = false) {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (disabled) { setTyped(words[0] ?? ''); return; }
    let r = 0, i = 0, del = false;
    let timer: number;
    setTyped('');
    const tick = () => {
      const w = words[r % words.length];
      if (!del) {
        i++;
        if (i >= w.length) { del = true; setTyped(w); timer = window.setTimeout(tick, HOLD_MS); return; }
      } else {
        i--;
        if (i <= 0) { del = false; r = (r + 1) % words.length; }
      }
      setTyped(w.slice(0, i));
      timer = window.setTimeout(tick, del ? DELETE_MS : TYPE_MS);
    };
    timer = window.setTimeout(tick, START_MS);
    return () => clearTimeout(timer);
  }, [words, disabled]);

  return typed;
}
