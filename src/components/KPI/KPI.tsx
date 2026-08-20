import type { ReactNode } from 'react';

interface KPIProps {
  value: ReactNode;
  label: string;
  variant?: 'acento' | 'riesgo' | '';
}

export function KPI({ value, label, variant = '' }: KPIProps) {
  return (
    <div className={`kpi ${variant}`.trim()}>
      <div className="n">{value}</div>
      <div className="l">{label}</div>
    </div>
  );
}
