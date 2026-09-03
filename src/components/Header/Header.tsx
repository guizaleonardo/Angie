import { useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../BrandLogo/BrandLogo';

function isAmbulatoria(pathname: string): boolean {
  return pathname.startsWith('/ambulatoria');
}

export function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const ambulatoria = isAmbulatoria(pathname);

  return (
    <div className="top">
      <BrandLogo />
      <div className="top-titles">
        <h1>{ambulatoria ? 'Rondas de seguridad · Clínica Piedecuesta' : 'Rondas de seguridad del paciente'}</h1>
        <span className="sub">
          {ambulatoria
            ? 'Sede ambulatoria — sin camas ni pacientes hospitalizados'
            : 'Guía Técnica de Buenas Prácticas · Resolución 3100 de 2019'}
        </span>
      </div>
      <div className="app-switch" role="tablist" aria-label="Tipo de ronda">
        <button
          type="button"
          role="tab"
          aria-selected={!ambulatoria}
          className={ambulatoria ? '' : 'on'}
          onClick={() => navigate('/')}
        >
          Hospitalarias
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={ambulatoria}
          className={ambulatoria ? 'on' : ''}
          onClick={() => navigate('/ambulatoria')}
        >
          Ambulatorias
        </button>
      </div>
    </div>
  );
}
