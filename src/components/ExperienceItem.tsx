interface Role {
  title: string;
  date?: string;
  description?: string;
  bullets?: string[];
}

interface Experience {
  company: string;
  date?: string;
  summary?: string;
  role?: string;
  description?: string;
  roles?: Role[];
}

interface ExperienceItemProps {
  experience: Experience;
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  const hasRoles = Array.isArray(experience.roles) && experience.roles.length > 0;

  return (
    <article className="card experience-card">
      <div className="experience-header">
        <div>
          <h3>{experience.company}</h3>
          {experience.date && <p>{experience.date}</p>}
        </div>
      </div>

      {experience.summary && <p>{experience.summary}</p>}

      {hasRoles ? (
        <div className="roles-list">
          {experience.roles!.map((r) => (
            <div key={r.title} className="role-item" style={{ marginTop: 12 }}>
              <div className="experience-header">
                <div>
                  <h4 style={{ margin: 0 }}>{r.title}</h4>
                  {r.description && <p style={{ margin: '6px 0' }}>{r.description}</p>}
                </div>
                {r.date && <span>{r.date}</span>}
              </div>
              {r.bullets && (
                <ul style={{ marginTop: 8 }}>
                  {r.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>{experience.description}</p>
      )}
    </article>
  );
}
