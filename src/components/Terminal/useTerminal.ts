import { useCallback, useState } from 'react';
import type { Lang } from '../../data/ui';
import { out, welcome, type Line } from './commands';

interface State {
  lang: Lang;
  lines: Line[];
  input: string;
  hist: string[];
  hIdx: number;
}

const initial = (lang: Lang): State => ({ lang, lines: welcome(lang), input: '', hist: [], hIdx: -1 });

/**
 * Estado do terminal. Fica no App para sobreviver à troca de visão (normal/JSON);
 * ao trocar de idioma, volta para a mensagem de boas-vindas.
 */
export function useTerminal(lang: Lang, openJson: () => void) {
  let [s, setS] = useState(() => initial(lang));
  if (s.lang !== lang) {
    s = { ...s, lang, lines: welcome(lang) };
    setS(s);
  }

  const run = useCallback((cmd: string) => {
    const raw = cmd.trim().toLowerCase();
    if (raw === 'clear') {
      setS(p => ({ ...p, lines: [], input: '', hist: [cmd, ...p.hist], hIdx: -1 }));
      return;
    }
    const result = out(cmd, lang, openJson);
    setS(p => ({
      ...p,
      lines: [...p.lines, { text: '❯ ' + cmd, kind: 'in' }, ...result],
      input: '', hist: cmd.trim() ? [cmd, ...p.hist] : p.hist, hIdx: -1,
    }));
  }, [lang, openJson]);

  const setInput = useCallback((input: string) => setS(p => ({ ...p, input })), []);

  const histUp = useCallback(() => setS(p => {
    if (!p.hist.length) return p;
    const i = Math.min(p.hIdx + 1, p.hist.length - 1);
    return { ...p, hIdx: i, input: p.hist[i] };
  }), []);

  const histDown = useCallback(() => setS(p => {
    const i = p.hIdx - 1;
    return { ...p, hIdx: Math.max(i, -1), input: i >= 0 ? p.hist[i] : '' };
  }), []);

  return { lines: s.lines, input: s.input, run, setInput, histUp, histDown };
}

export type TerminalState = ReturnType<typeof useTerminal>;
