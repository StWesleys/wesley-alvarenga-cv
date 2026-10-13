import { forwardRef } from 'react';
import { C } from '../../data/content';
import { T } from '../../data/ui';
import { useLang } from '../../i18n/LangContext';
import { SectionTitle } from '../SectionHead/SectionHead';
import styles from './Education.module.css';

/** 04 · Educação e 05 · Idiomas, lado a lado. */
export const Education = forwardRef<HTMLElement>(function Education(_props, ref) {
  const { lang } = useLang();
  const t = T[lang], c = C[lang];

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.col}>
        <SectionTitle num="04" title={t.h_edu} ruled />
        <div className={styles.edu}>
          <div className={styles.course}>{c.edu.course}</div>
          <div className={styles.school}>Estácio</div>
          <div className={styles.eduMeta}>
            <span className={styles.years} data-count="1">2019 — 2023</span>
            <span>{c.edu.place}</span>
          </div>
        </div>
      </div>
      <div className={styles.col}>
        <SectionTitle num="05" title={t.h_lang} ruled />
        <div className={styles.langs}>
          {c.langs.map(l => (
            <div key={l.name} className={styles.lang}>
              <span className={styles.langName}>{l.name}</span>
              <span className={styles.level}>{l.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
