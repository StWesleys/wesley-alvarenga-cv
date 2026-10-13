import type { ReactNode } from 'react';
import styles from './Background.module.css';

export function Background({ children }: { children: ReactNode }) {
  return <div className={styles.page}>{children}</div>;
}
