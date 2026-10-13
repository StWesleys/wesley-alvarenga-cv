import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { T, type Lang } from '../data/ui';

const LS_KEY = 'wa-cv-lang';

interface LangValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangValue | null>(null);

function readStored(): Lang {
  try {
    const s = localStorage.getItem(LS_KEY);
    if (s && s in T) return s as Lang;
  } catch {
    // localStorage indisponível
  }
  return 'pt';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStored);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    try {
      localStorage.setItem(LS_KEY, next);
    } catch {
      // localStorage indisponível
    }
    setLangState(next);
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang precisa estar dentro de <LangProvider>');
  return ctx;
}
