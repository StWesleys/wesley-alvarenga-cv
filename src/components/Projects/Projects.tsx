import { forwardRef } from 'react';
import { LINKS } from '../../data/profile';
import { PROJ, PROJECTS } from '../../data/projects';
import { matches } from '../../data/skills';
import { T } from '../../data/ui';
import { useLang } from '../../i18n/LangContext';
import { SectionHead } from '../SectionHead/SectionHead';
import { TechChip } from '../TechChip/TechChip';
import styles from './Projects.module.css';

interface Props {
  skill: string | null;
  onPick: (name: string) => void;
}

export const Projects = forwardRef<HTMLElement, Props>(function Projects({ skill, onPick }, ref) {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section ref={ref} className={styles.section}>
      <SectionHead
        num="02"
        title={t.h_proj}
        aside={<a href={LINKS.github} target="_blank" rel="noopener noreferrer" className={styles.allRepos}>{t.allRepos}</a>}
      />
      {PROJECTS.map(p => {
        const x = PROJ[lang][p.id];
        const hit = !skill || matches(skill, p.techs);
        const cls = [styles.card, skill && hit && styles.hit, !hit && styles.dim].filter(Boolean).join(' ');
        return (
          <article key={p.id} className={cls}>
            <div className={styles.top}>
              <div className={styles.titles}>
                <div className={styles.owner}>StWesleys /</div>
                <h3 className={styles.name}>{p.name}</h3>
                <div className={styles.tagline}>{x.tagline}</div>
              </div>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className={styles.code}>{t.viewCode} ↗</a>
            </div>
            <p className={styles.summary}>{x.summary}</p>
            <div className={styles.parts}>
              {x.parts.map(([path, desc]) => (
                <div key={path} className={styles.part}>
                  <span className={styles.path}>{path}</span>
                  <span className={styles.desc}>{desc}</span>
                </div>
              ))}
            </div>
            <div className={styles.chips}>
              {p.techs.map(name => <TechChip key={name} name={name} skill={skill} onPick={onPick} />)}
            </div>
          </article>
        );
      })}
    </section>
  );
});
