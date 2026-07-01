interface PillProps {
  label: string;
}

export function Pill({ label }: PillProps) {
  return <span className="pill">{label}</span>;
}
