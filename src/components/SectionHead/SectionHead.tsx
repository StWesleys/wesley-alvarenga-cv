import type { ReactNode } from 'react';
import styles from './SectionHead.module.css';

interface TitleProps {
  num: string;
  title: string;
  /** h2 com a própria borda inferior (educação e idiomas) */
  ruled?: boolean;
}

export function SectionTitle({ num, title, ruled }: TitleProps) {
  return (
    <h2 className={`${styles.h2} ${ruled ? styles.ruled : ''}`}>
      <span className={styles.num} data-count="1">{num}</span>
      {title}
    </h2>
  );
}

interface Props {
  num: string;
  title: string;
  /** texto à direita (ou um link, via `aside`) */
  note?: string;
  aside?: ReactNode;
}

export function SectionHead({ num, title, note, aside }: Props) {
  return (
    <div className={styles.head}>
      <SectionTitle num={num} title={title} />
      {aside ?? <div className={styles.note}>{note}</div>}
    </div>
  );
}

export const sectionNoteClass = styles.note;
