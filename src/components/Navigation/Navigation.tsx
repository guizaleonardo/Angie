import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { planesAbiertos } from '../../utils/calculations';

const TABS = [
  { path: '/', label: 'Tablero' },
  { path: '/rondas', label: 'Rondas' },
  { path: '/aplicar', label: 'Aplicar ronda' },
  { path: '/hallazgos', label: 'Hallazgos y planes' },
  { path: '/datos', label: 'Exportar' },
];

function isActive(pathname: string, path: string): boolean {
  if (path === '/') return pathname === '/' || pathname === '/tablero';
  if (path === '/aplicar') return pathname.startsWith('/aplicar');
  return pathname === path;
}

export function Navigation() {
  const { data } = useApp();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const abiertos = planesAbiertos(data.hallazgos);

  return (
    <div className="nav">
      {TABS.map((tab) => (
        <button
          key={tab.path}
          type="button"
          className={isActive(pathname, tab.path) ? 'on' : ''}
          onClick={() => navigate(tab.path)}
        >
          {tab.label}
          {tab.path === '/hallazgos' && abiertos ? ` · ${abiertos}` : ''}
        </button>
      ))}
    </div>
  );
}
