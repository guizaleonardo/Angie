import { useLocation, useNavigate } from 'react-router-dom';
import { useVisita } from '../../context/AmbulatoriaContext';
import { sinValidar } from '../../utils/ambulatoria';
import { pathOf } from '../../visita/config';

const TABS = [
  { suffix: '', label: 'Visita' },
  { suffix: '/practicas', label: 'Prácticas seguras' },
  { suffix: '/areas', label: 'Áreas' },
  { suffix: '/puntos', label: 'Puntos verificados' },
  { suffix: '/hallazgos', label: 'Hallazgos' },
  { suffix: '/informe', label: 'Informe general' },
];

function isActive(pathname: string, path: string, isRoot: boolean): boolean {
  if (isRoot) return pathname === path || pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function Navigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { visita, config } = useVisita();
  const pendientes = sinValidar(visita);

  return (
    <div className="nav">
      {TABS.map((tab) => {
        const path = pathOf(config, tab.suffix);
        const active = isActive(pathname, path, tab.suffix === '');
        return (
          <button
            key={tab.suffix || 'visita'}
            type="button"
            className={active ? 'on' : ''}
            onClick={() => navigate(path)}
          >
            {tab.label}
            {tab.suffix === '/hallazgos' && pendientes ? ` · ${pendientes}` : ''}
          </button>
        );
      })}
      <button
        type="button"
        className={pathname.startsWith('/usuarios') ? 'on' : ''}
        onClick={() => navigate('/usuarios')}
      >
        Usuarios
      </button>
    </div>
  );
}
