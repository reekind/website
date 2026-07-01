interface Experience {
  company: string;
  role: string;
  date: string;
  description: string;
}

interface ExperienceItemProps {
  experience: Experience;
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  return (
    <article className="card experience-card">
      <div className="experience-header">
        <div>
          <h3>{experience.role}</h3>
          <p>{experience.company}</p>
        </div>
        <span>{experience.date}</span>
      </div>
      <p>{experience.description}</p>
    </article>
  );
}
