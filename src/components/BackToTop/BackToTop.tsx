import { useEffect, useState } from 'react';
import { T } from '../../data/ui';
import { useLang } from '../../i18n/LangContext';
import { IconArrowUp } from '../icons';
import styles from './BackToTop.module.css';

export function BackToTop() {
  const { lang } = useLang();
  const label = T[lang].toTop;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      tabIndex={show ? 0 : -1}
      className={`${styles.btn} ${show ? styles.show : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <IconArrowUp />
    </button>
  );
}
