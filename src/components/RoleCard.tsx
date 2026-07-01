interface Role {
  title: string;
  date?: string;
  description?: string;
  bullets?: string[];
}

interface RoleCardProps {
  company: string;
  role: Role;
}

export function RoleCard({ company, role }: RoleCardProps) {
  return (
    <article className="card experience-card">
      <div className="experience-header">
        <div>
          <h3>{role.title}</h3>
          <p>{company}</p>
        </div>
        {role.date && <span>{role.date}</span>}
      </div>

      {role.description && <p>{role.description}</p>}

      {role.bullets && (
        <ul>
          {role.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
