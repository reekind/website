import { Pill } from './Pill';

interface SkillGroup {
  title: string;
  items: string[];
}

interface SkillsGridProps {
  groups: SkillGroup[];
}

export function SkillsGrid({ groups }: SkillsGridProps) {
  return (
    <div className="skills-grid">
      {groups.map((g) => (
        <div key={g.title} className="skill-group card">
          <h4 style={{ marginTop: 0 }}>{g.title}</h4>
          <div className="pills-grid">
            {g.items.map((s) => (
              <Pill key={s} label={s} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
