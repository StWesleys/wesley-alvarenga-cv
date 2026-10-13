import { forwardRef } from 'react';
import { C } from '../../data/content';
import { EMAIL, LINKS, PHONE } from '../../data/profile';
import { T } from '../../data/ui';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useLang } from '../../i18n/LangContext';
import { IconGH, IconLI, IconMail, IconWA } from '../icons';
import styles from './Hero.module.css';

interface Props {
  emailCopied: boolean;
  onCopyEmail: () => void;
  reduceMotion: boolean;
}

export const Hero = forwardRef<HTMLElement, Props>(function Hero({ emailCopied, onCopyEmail, reduceMotion }, ref) {
  const { lang } = useLang();
  const t = T[lang], c = C[lang];
  const typed = useTypewriter(t.roles, reduceMotion);

  return (
    <section ref={ref} className={styles.hero}>
      <div className={styles.hello}>{t.hello}</div>
      <h1 className={styles.name}>Wesley<br />Alvarenga</h1>
      <div className={styles.typing}>
        <span className={styles.prompt}>&gt;</span>
        <span>{typed}</span>
        <span className={styles.cursor} aria-hidden="true" />
      </div>
      <p className={styles.about}>{c.about}</p>
      <div className={styles.contacts}>
        <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" title="WhatsApp" className={styles.contact}>
          <IconWA className={styles.icon} /><span>{PHONE}</span>
        </a>
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn" className={styles.contact}>
          <IconLI className={styles.icon} />
        </a>
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub" className={styles.contact}>
          <IconGH className={styles.icon} />
        </a>
        <button type="button" onClick={onCopyEmail} title={EMAIL} aria-label="E-mail" className={styles.contact}>
          <IconMail className={styles.icon} />
          {emailCopied && <span role="status">{t.copied}</span>}
        </button>
      </div>
    </section>
  );
});
