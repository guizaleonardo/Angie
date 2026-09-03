import { useLocation, useNavigate } from 'react-router-dom';
import { useAmbulatoria } from '../../context/AmbulatoriaContext';
import { useApp } from '../../context/AppContext';
import { sinValidar } from '../../utils/ambulatoria';
import { planesAbiertos } from '../../utils/calculations';

const HOSP_TABS = [
  { path: '/', label: 'Tablero' },
  { path: '/rondas', label: 'Rondas' },
  { path: '/aplicar', label: 'Aplicar ronda' },
  { path: '/hallazgos', label: 'Hallazgos y planes' },
  { path: '/datos', label: 'Exportar' },
];

const AMB_TABS = [
  { path: '/ambulatoria', label: 'Visita' },
  { path: '/ambulatoria/practicas', label: 'Prácticas seguras' },
  { path: '/ambulatoria/areas', label: 'Áreas' },
  { path: '/ambulatoria/puntos', label: 'Puntos verificados' },
  { path: '/ambulatoria/hallazgos', label: 'Hallazgos' },
  { path: '/ambulatoria/informe', label: 'Informe general' },
];

function isHospActive(pathname: string, path: string): boolean {
  if (path === '/') return pathname === '/' || pathname === '/tablero';
  if (path === '/aplicar') return pathname.startsWith('/aplicar');
  return pathname === path;
}

function isAmbActive(pathname: string, path: string): boolean {
  if (path === '/ambulatoria') return pathname === '/ambulatoria';
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function Navigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const ambulatoria = pathname.startsWith('/ambulatoria');

  if (ambulatoria) return <NavAmbulatoria pathname={pathname} navigate={navigate} />;
  return <NavHospitalaria pathname={pathname} navigate={navigate} />;
}

function NavHospitalaria({
  pathname,
  navigate,
}: {
  pathname: string;
  navigate: (path: string) => void;
}) {
  const { data } = useApp();
  const abiertos = planesAbiertos(data.hallazgos);

  return (
    <div className="nav">
      {HOSP_TABS.map((tab) => (
        <button
          key={tab.path}
          type="button"
          className={isHospActive(pathname, tab.path) ? 'on' : ''}
          onClick={() => navigate(tab.path)}
        >
          {tab.label}
          {tab.path === '/hallazgos' && abiertos ? ` · ${abiertos}` : ''}
        </button>
      ))}
    </div>
  );
}

function NavAmbulatoria({
  pathname,
  navigate,
}: {
  pathname: string;
  navigate: (path: string) => void;
}) {
  const { visita } = useAmbulatoria();
  const pendientes = sinValidar(visita);

  return (
    <div className="nav">
      {AMB_TABS.map((tab) => (
        <button
          key={tab.path}
          type="button"
          className={isAmbActive(pathname, tab.path) ? 'on' : ''}
          onClick={() => navigate(tab.path)}
        >
          {tab.label}
          {tab.path === '/ambulatoria/hallazgos' && pendientes ? ` · ${pendientes}` : ''}
        </button>
      ))}
    </div>
  );
}
