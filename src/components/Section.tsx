import { PropsWithChildren } from 'react';

interface SectionProps {
  title: string;
}

export function Section({ title, children }: PropsWithChildren<SectionProps>) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
