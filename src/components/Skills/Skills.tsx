import { forwardRef } from 'react';
import { C } from '../../data/content';
import { SKILLS, type SkillGroup } from '../../data/skills';
import { T } from '../../data/ui';
import { useLang } from '../../i18n/LangContext';
import { SectionHead } from '../SectionHead/SectionHead';
import { TechChip } from '../TechChip/TechChip';
import styles from './Skills.module.css';

interface Props {
  skill: string | null;
  onPick: (name: string) => void;
}

export const Skills = forwardRef<HTMLElement, Props>(function Skills({ skill, onPick }, ref) {
  const { lang } = useLang();
  const t = T[lang], c = C[lang];

  return (
    <section ref={ref} className={styles.section}>
      <SectionHead num="03" title={t.h_skills} note={t.skillHint} />
      <div className={styles.grid}>
        {(Object.entries(SKILLS) as [SkillGroup, string[]][]).map(([k, items]) => (
          <div key={k} className={styles.group}>
            <div className={styles.label}>{'// ' + c.groups[k].toLowerCase()}</div>
            <div className={styles.items}>
              {items.map(name => <TechChip key={name} name={name} skill={skill} onPick={onPick} variant="skill" />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});
