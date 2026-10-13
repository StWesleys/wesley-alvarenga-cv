import { useCallback, useRef, useState, type RefObject } from 'react';
import { Availability } from './components/Availability/Availability';
import { BackToTop } from './components/BackToTop/BackToTop';
import { Background } from './components/Background/Background';
import { Education } from './components/Education/Education';
import { Experience } from './components/Experience/Experience';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { JsonView } from './components/JsonView/JsonView';
import { Projects } from './components/Projects/Projects';
import { Skills } from './components/Skills/Skills';
import { Spotlight } from './components/Spotlight/Spotlight';
import { Terminal } from './components/Terminal/Terminal';
import { useTerminal } from './components/Terminal/useTerminal';
import type { Experience as Exp } from './data/experiences';
import { EMAIL } from './data/profile';
import { useCopy } from './hooks/useCopy';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useReveal } from './hooks/useReveal';
import { useLang } from './i18n/LangContext';
import styles from './App.module.css';

export type View = 'visual' | 'code';
export type SectionKey = 'sobre' | 'terminal' | 'exp' | 'proj' | 'stack' | 'edu';

export default function App() {
  const { lang } = useLang();
  const [view, setView] = useState<View>('visual');
  const [skill, setSkill] = useState<string | null>(null);
  const [open, setOpen] = useState<Partial<Record<Exp['id'], boolean>>>({ tab: true });
  const [emailCopied, copy] = useCopy();
  const reduceMotion = useReducedMotion();

  const headerRef = useRef<HTMLElement>(null);
  const sobre = useRef<HTMLElement>(null);
  const terminal = useRef<HTMLElement>(null);
  const exp = useRef<HTMLElement>(null);
  const proj = useRef<HTMLElement>(null);
  const stack = useRef<HTMLElement>(null);
  const edu = useRef<HTMLElement>(null);
  const sections: Record<SectionKey, RefObject<HTMLElement>> = { sobre, terminal, exp, proj, stack, edu };

  const isVisual = view === 'visual';
  useReveal([sobre, terminal, exp, proj, stack, edu], isVisual, reduceMotion);

  const openJson = useCallback(() => {
    setView('code');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const term = useTerminal(lang, openJson);

  // rola até a seção descontando a altura real do header (2 linhas no celular)
  const go = (key: SectionKey) => {
    const el = sections[key].current;
    if (!el) {
      setView('visual');
      setTimeout(() => go(key), 30);
      return;
    }
    const headH = headerRef.current?.offsetHeight ?? 56;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - (headH + 16), behavior: 'smooth' });
  };

  const toggleView = () => {
    setView(v => (v === 'visual' ? 'code' : 'visual'));
    window.scrollTo({ top: 0 });
  };

  const pickSkill = useCallback((name: string) => setSkill(s => (s === name ? null : name)), []);
  const copyEmail = () => copy(EMAIL);

  return (
    <Background>
      <BackToTop />
      <Spotlight />
      <Header ref={headerRef} view={view} onGo={go} onToggleView={toggleView} />
      <main className={styles.main}>
        {isVisual ? (
          <>
            <Hero ref={sobre} emailCopied={emailCopied} onCopyEmail={copyEmail} reduceMotion={reduceMotion} />
            <Terminal ref={terminal} term={term} />
            <Experience ref={exp} skill={skill} onPick={pickSkill} open={open} onToggle={id => setOpen(o => ({ ...o, [id]: !o[id] }))} />
            <Projects ref={proj} skill={skill} onPick={pickSkill} />
            <Skills ref={stack} skill={skill} onPick={pickSkill} />
            <Education ref={edu} />
          </>
        ) : (
          <JsonView />
        )}
        <Availability />
        <Footer onCopyEmail={copyEmail} />
      </main>
    </Background>
  );
}
