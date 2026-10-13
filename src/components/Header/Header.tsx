import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { LANGS, T } from '../../data/ui';
import { useLang } from '../../i18n/LangContext';
import type { SectionKey, View } from '../../App';
import styles from './Header.module.css';

const TAB_KEYS: SectionKey[] = ['sobre', 'terminal', 'exp', 'proj', 'stack', 'edu'];

interface Props {
  view: View;
  onGo: (key: SectionKey) => void;
  onToggleView: () => void;
}

export const Header = forwardRef<HTMLElement, Props>(function Header({ view, onGo, onToggleView }, ref) {
  const { lang, setLang } = useLang();
  const t = T[lang];
  const navRef = useRef<HTMLElement>(null);
  const [fade, setFade] = useState({ l: false, r: false });

  // esmaece as bordas da nav só do lado que tem conteúdo escondido
  const updateFade = useCallback(() => {
    const n = navRef.current;
    if (!n) return;
    const l = n.scrollLeft > 2, r = n.scrollLeft + n.clientWidth < n.scrollWidth - 2;
    setFade(f => (f.l === l && f.r === r ? f : { l, r }));
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateFade);
    return () => window.removeEventListener('resize', updateFade);
  }, [updateFade]);

  useEffect(() => {
    const id = requestAnimationFrame(updateFade);
    return () => cancelAnimationFrame(id);
  }, [lang, updateFade]);

  const isVisual = view === 'visual';
  const navClass = [styles.nav, fade.l && styles.fadeL, fade.r && styles.fadeR].filter(Boolean).join(' ');

  return (
    <header ref={ref} className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.dot} />
          <span>~/wesley-alvarenga</span>
        </div>
        <nav ref={navRef} onScroll={updateFade} className={navClass}>
          {TAB_KEYS.map((k, i) => (
            <button key={k} type="button" className={styles.tab} onClick={() => onGo(k)}>{t.tabs[i]}</button>
          ))}
        </nav>
        <div className={styles.controls}>
          <div className={styles.langs}>
            {LANGS.map(([k, label, title]) => (
              <button
                key={k}
                type="button"
                title={title}
                aria-pressed={lang === k}
                className={`${styles.langBtn} ${lang === k ? styles.langActive : ''}`}
                onClick={() => { if (k !== lang) setLang(k); }}
              >
                {label}
              </button>
            ))}
          </div>
          <span className={styles.divider} />
          <button
            type="button"
            title={isVisual ? 'JSON' : t.visual}
            className={`${styles.viewBtn} ${isVisual ? '' : styles.viewCode}`}
            onClick={onToggleView}
          >
            <span className={styles.viewIcon}>{isVisual ? '{ }' : '←'}</span>
            {isVisual ? 'JSON' : t.visual}
          </button>
        </div>
      </div>
    </header>
  );
});
