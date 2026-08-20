import type { ReactNode } from 'react';

interface PillProps {
  className: string;
  children: ReactNode;
}

export function Pill({ className, children }: PillProps) {
  return <span className={`pill ${className}`}>{children}</span>;
}
