import { useRef } from 'react';
import { useSpotlight } from '../../hooks/useSpotlight';
import styles from './Spotlight.module.css';

export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useSpotlight(ref);
  return (
    <div ref={ref} className={styles.spot} aria-hidden="true">
      <div className={styles.grid} />
      <div className={styles.glow} />
    </div>
  );
}
