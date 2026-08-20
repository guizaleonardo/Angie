interface BarProps {
  value: number | null;
}

export function Bar({ value }: BarProps) {
  if (value == null) {
    return <span style={{ color: 'var(--tinta3)' }}>Sin datos</span>;
  }
  const tone = value >= 0.9 ? '' : value >= 0.75 ? '' : value >= 0.6 ? 'w' : 'b';
  return (
    <div className="row" style={{ gap: 8, flexWrap: 'nowrap' }}>
      <div className="bar" style={{ flex: 1 }}>
        <span className={tone} style={{ width: `${(value * 100).toFixed(1)}%` }} />
      </div>
      <span className="cifra" style={{ fontSize: 12, width: 52, textAlign: 'right' }}>
        {(value * 100).toFixed(1)}%
      </span>
    </div>
  );
}
