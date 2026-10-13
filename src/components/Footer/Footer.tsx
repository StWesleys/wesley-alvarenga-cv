import { EMAIL, LINKS } from '../../data/profile';
import { IconGH, IconLI, IconMail, IconWA } from '../icons';
import styles from './Footer.module.css';

export function Footer({ onCopyEmail }: { onCopyEmail: () => void }) {
  return (
    <footer className={styles.footer}>
      <span>© Wesley Alvarenga</span>
      <div className={styles.links}>
        <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp" className={styles.btn}><IconWA className={styles.icon} /></a>
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn" className={styles.btn}><IconLI className={styles.icon} /></a>
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub" className={styles.btn}><IconGH className={styles.icon} /></a>
        <button type="button" onClick={onCopyEmail} title={EMAIL} aria-label="E-mail" className={styles.btn}><IconMail className={styles.icon} /></button>
      </div>
    </footer>
  );
}
