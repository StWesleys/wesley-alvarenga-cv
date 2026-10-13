import { C } from '../../data/content';
import { useLang } from '../../i18n/LangContext';
import styles from './Availability.module.css';

export function Availability() {
  const { lang } = useLang();
  const c = C[lang];

  return (
    <section className={styles.box}>
      <div className={styles.base}>
        <div className={styles.label}>{c.baseLabel}</div>
        <div className={styles.location}><span className={styles.dot} />{c.location}</div>
      </div>
      <div className={styles.open}>
        <div className={styles.openLabel}>{c.open.label}</div>
        <div className={styles.pills}>
          {c.open.items.map(item => <span key={item} className={styles.pill}>{item}</span>)}
        </div>
      </div>
    </section>
  );
}
