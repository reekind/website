import { Section } from './components/Section';
import { Pill } from './components/Pill';
import { SkillsGrid } from './components/SkillsGrid';
import { ProfileCard } from './components/ProfileCard';
import { ExperienceItem } from './components/ExperienceItem';
import { RoleCard } from './components/RoleCard';
import { values, experiences, education, languages, skillGroups } from './data';
import avatar from './assets/avatar-placeholder.svg';

function App() {
  return (
    <div className="app">
      <header className="hero">
        <div className="hero-inner">
          <img src={avatar} alt="Avatar" className="avatar" />
          <div className="hero-text">
            <p className="eyebrow">Persönliche Homepage</p>
            <h1>Tim Bensberg</h1>
            <p className="lead">
              Erfahrener Software & Lösungsarchitekt mit über 10 Jahren Praxis in Entwicklung,
              Architektur und DevOps. Spezialisiert auf Microservice-Architekturen,
              Infrastrukturautomatisierung und strategische Technologieführung.
              Bringt Entwickler weiter, etabliert robuste Plattformen und übersetzt Ideen
              in skalierbare Systeme.
            </p>
            <div className="links-row">
              <a href="https://github.com/reekind" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <Section title="Berufliches Profil">
          <ProfileCard />
        </Section>

        <Section title="Kompetenzen">
          <SkillsGrid groups={skillGroups} />
        </Section>

        <Section title="Berufserfahrung">
          <div>
            {experiences.map((exp, idx) =>
              // If experience has a roles array, render summary then separate role cards
              Array.isArray((exp as any).roles) && (exp as any).roles.length > 0 ? (
                <div key={exp.company + idx}>
                  {exp.summary && <p style={{ marginTop: 0 }}>{exp.summary}</p>}
                  <div className="grid-2">
                    {(exp as any).roles.map((r: any) => (
                      <RoleCard key={r.title} company={exp.company} role={r} />
                    ))}
                  </div>
                </div>
              ) : (
                <ExperienceItem key={exp.company + idx} experience={exp} />
              )
            )}
          </div>
        </Section>

        <Section title="Ausbildung">
          <div className="timeline">
            {education.map((item) => (
              <div key={item.title} className="timeline-item">
                <span className="timeline-date">{item.date}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Sprachen">
          <ul className="simple-list">
            {languages.map((language) => (
              <li key={language.name}>
                <strong>{language.name}:</strong> {language.level}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Werte & Arbeitsweise">
          <ul className="simple-list">
            {values.map((value) => (
              <li key={value.title}>
                <strong>{value.title}:</strong> {value.description}
              </li>
            ))}
          </ul>
        </Section>
      </main>
    </div>
  );
}

export default App;
