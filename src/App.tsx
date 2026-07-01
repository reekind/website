import { Section } from './components/Section';
import { Pill } from './components/Pill';
import { SkillGroup } from './components/SkillGroup';
import { ProfileCard } from './components/ProfileCard';
import { ExperienceItem } from './components/ExperienceItem';
import { values, experiences, education, languages, skills } from './data';

function App() {
  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">Persönliche Homepage</p>
          <h1>Dein Name</h1>
          <p className="lead">
            Erfahrene:r IT-Professional mit Schwerpunkt moderne Webentwicklung,
            Cloud-Infrastruktur und Teamführung.
          </p>
          <div className="links-row">
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </header>

      <main>
        <Section title="Berufliches Profil">
          <ProfileCard />
        </Section>

        <Section title="Kompetenzen">
          <SkillGroup skills={skills} />
        </Section>

        <Section title="Berufserfahrung">
          <div className="grid-2">
            {experiences.map((exp) => (
              <ExperienceItem key={exp.role} experience={exp} />
            ))}
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
