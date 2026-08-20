import type { PuntoTendencia } from '../../types';

interface TrendChartProps {
  points: PuntoTendencia[];
}

export function TrendChart({ points }: TrendChartProps) {
  const W = 660;
  const H = 170;
  const pd = 34;
  const x = (i: number) => (points.length === 1 ? W / 2 : pd + (i * (W - pd * 2)) / (points.length - 1));
  const y = (v: number) => H - 26 - v * (H - 52);
  const linea = points.map((p, i) => `${x(i)},${y(p.v)}`).join(' ');
  const guides = [0, 0.5, 0.75, 0.9, 1];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: '100%', height: 'auto', maxHeight: 210 }}
      role="img"
      aria-label="Tendencia del cumplimiento por periodo"
    >
      {guides.map((g) => (
        <g key={g}>
          <line
            x1={pd}
            x2={W - pd}
            y1={y(g)}
            y2={y(g)}
            stroke={g === 0.9 ? '#B7D3C7' : '#E7EBE8'}
            strokeDasharray={g === 0.9 ? '4 3' : '0'}
          />
          <text x="4" y={y(g) + 4} fontSize="10" fill="#7C8A85" fontFamily="IBM Plex Mono,monospace">
            {(g * 100).toFixed(0)}%
          </text>
        </g>
      ))}
      <polyline points={linea} fill="none" stroke="#0E5C4A" strokeWidth="2.5" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={p.k}>
          <circle cx={x(i)} cy={y(p.v)} r="4.5" fill="#fff" stroke="#0E5C4A" strokeWidth="2.5" />
          <text
            x={x(i)}
            y={H - 8}
            textAnchor="middle"
            fontSize="10"
            fill="#4A5A55"
            fontFamily="IBM Plex Mono,monospace"
          >
            {p.k}
          </text>
          <text
            x={x(i)}
            y={y(p.v) - 11}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="600"
            fill="#0E5C4A"
            fontFamily="IBM Plex Mono,monospace"
          >
            {(p.v * 100).toFixed(0)}%
          </text>
        </g>
      ))}
    </svg>
  );
}
