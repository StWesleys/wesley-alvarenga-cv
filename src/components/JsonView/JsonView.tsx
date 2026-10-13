import { T } from '../../data/ui';
import { useCopy } from '../../hooks/useCopy';
import { useLang } from '../../i18n/LangContext';
import { getJsonLines, getJsonText } from '../../lib/resumeJson';
import styles from './JsonView.module.css';

export function JsonView() {
  const { lang } = useLang();
  const t = T[lang];
  const [copied, copy] = useCopy();

  return (
    <section className={styles.section}>
      <div className={styles.box}>
        <div className={styles.bar}>
          <span>wesley-alvarenga.json</span>
          <button type="button" className={styles.copy} onClick={() => copy(getJsonText(lang))}>
            {copied ? t.copiedJson : t.copy}
          </button>
        </div>
        <div className={styles.code}>
          {getJsonLines(lang).map(jl => (
            <div key={jl.n} className={styles.line}>
              <span className={styles.n}>{jl.n}</span>
              {jl.toks.map((tk, i) => <span key={i} className={styles[tk.k]}>{tk.t}</span>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
