import { forwardRef, useEffect, useRef, type KeyboardEvent } from 'react';
import { T } from '../../data/ui';
import { useLang } from '../../i18n/LangContext';
import { QUICK_CMDS, cmdName } from './commands';
import type { TerminalState } from './useTerminal';
import styles from './Terminal.module.css';

export const Terminal = forwardRef<HTMLElement, { term: TerminalState }>(function Terminal({ term }, ref) {
  const { lang } = useLang();
  const t = T[lang];
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // nova linha: rola o corpo até o fim
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [term.lines]);

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') term.run(term.input);
    else if (e.key === 'ArrowUp') { e.preventDefault(); term.histUp(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); term.histDown(); }
  };

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.box}>
        <div className={styles.bar}>
          <span className={styles.light} />
          <span className={styles.light} />
          <span className={styles.light} />
          <span className={styles.title}>wesley@dev: ~ — zsh</span>
        </div>
        <div ref={bodyRef} className={styles.body} onClick={() => inputRef.current?.focus({ preventScroll: true })}>
          {term.lines.map((ln, i) => (
            <div key={i} className={`${styles.line} ${styles[ln.kind]}`}>{ln.text}</div>
          ))}
          <div className={styles.inputRow}>
            <span className={styles.caret}>❯</span>
            <input
              ref={inputRef}
              className={styles.input}
              value={term.input}
              onChange={e => term.setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder={t.placeholder}
              aria-label="terminal"
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
            />
          </div>
        </div>
        <div className={styles.quick}>
          {QUICK_CMDS.map(k => {
            const name = cmdName(lang, k);
            return <button key={k} type="button" className={styles.quickBtn} onClick={() => term.run(name)}>{name}</button>;
          })}
        </div>
      </div>
    </section>
  );
});
