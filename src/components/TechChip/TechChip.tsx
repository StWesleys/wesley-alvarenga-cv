import { isOn } from '../../data/skills';
import styles from './TechChip.module.css';

interface Props {
  name: string;
  skill: string | null;
  onPick: (name: string) => void;
  variant?: 'chip' | 'skill';
}

export function TechChip({ name, skill, onPick, variant = 'chip' }: Props) {
  const on = isOn(skill, name);
  return (
    <button
      type="button"
      className={`${styles[variant]} ${on ? styles.on : ''}`}
      aria-pressed={on}
      onClick={() => onPick(name)}
    >
      {name}
    </button>
  );
}
