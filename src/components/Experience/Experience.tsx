import { forwardRef } from 'react';
import { C } from '../../data/content';
import { EXPS, per, type Experience as Exp } from '../../data/experiences';
import { matches } from '../../data/skills';
import { T } from '../../data/ui';
import { useLang } from '../../i18n/LangContext';
import { SectionHead } from '../SectionHead/SectionHead';
import { TechChip } from '../TechChip/TechChip';
import styles from './Experience.module.css';

interface Props {
  skill: string | null;
  onPick: (name: string) => void;
  open: Partial<Record<Exp['id'], boolean>>;
  onToggle: (id: Exp['id']) => void;
}

export const Experience = forwardRef<HTMLElement, Props>(function Experience({ skill, onPick, open, onToggle }, ref) {
  const { lang } = useLang();
  const t = T[lang], c = C[lang];
  const nHit = skill ? EXPS.filter(e => matches(skill, e.techs)).length : 0;

  return (
    <section ref={ref} className={styles.section}>
      <SectionHead num="01" title={t.h_exp} note={skill ? t.filterOn(skill, nHit, EXPS.length) : t.filterIdle} />
      {EXPS.map(e => {
        const x = c.exps[e.id];
        const hit = !skill || matches(skill, e.techs);
        const isOpen = !!open[e.id];
        const cls = [styles.card, skill && hit && styles.hit, !hit && styles.dim].filter(Boolean).join(' ');
        return (
          <article key={e.id} className={cls}>
            <div className={styles.meta}>
              <div className={styles.period} data-count="1">{per(lang, e.start, e.end)}</div>
              <div className={styles.place}>{x.place}</div>
              <div className={styles.phases}>
                {e.phases.map(([label, a, b]) => (
                  <div key={label} className={styles.phase}>
                    <span className={styles.badge}>{label}</span>
                    <span data-count="1">{per(lang, a, b)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.main}>
              <div>
                <h3 className={styles.company}>{e.company}</h3>
                <div className={styles.role}>{x.role}</div>
              </div>
              <p className={styles.summary}>{x.summary}</p>
              {x.bullets.length > 0 && (
                <>
                  <button type="button" className={styles.toggle} aria-expanded={isOpen} onClick={() => onToggle(e.id)}>
                    {isOpen ? t.hide : t.show(x.bullets.length)}
                  </button>
                  {isOpen && (
                    <ul className={styles.bullets}>
                      {x.bullets.map((b, i) => (
                        <li key={i} className={styles.bullet}><span className={styles.arrow}>→</span><span>{b}</span></li>
                      ))}
                    </ul>
                  )}
                </>
              )}
              <div className={styles.chips}>
                {e.techs.map(name => <TechChip key={name} name={name} skill={skill} onPick={onPick} />)}
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
});
