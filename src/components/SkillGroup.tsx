import { Pill } from './Pill';

interface SkillGroupProps {
  skills: string[];
}

export function SkillGroup({ skills }: SkillGroupProps) {
  return (
    <div className="pills-grid">
      {skills.map((skill) => (
        <Pill key={skill} label={skill} />
      ))}
    </div>
  );
}
