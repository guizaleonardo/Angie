import { useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../BrandLogo/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { ROL_LABEL } from '../../types/user';

function isAmbulatoria(pathname: string): boolean {
  return pathname.startsWith('/ambulatoria');
}

export function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const ambulatoria = isAmbulatoria(pathname);
  const { user, usuarios, selectedUserId, setSelectedUserId, canSeeTeam, logout } = useAuth();
  const visto = usuarios.find((item) => item.id === selectedUserId);

  return (
    <div className="top">
      <BrandLogo />
      <div className="top-titles">
        <h1>Rondas de seguridad · Clínica Piedecuesta</h1>
        <span className="sub">
          {ambulatoria
            ? 'Sede ambulatoria — sin camas ni pacientes hospitalizados'
            : 'Sede principal — ronda por área o de toda la sede'}
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
          Sede principal
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
      {user ? (
        <div className="session">
          {canSeeTeam ? (
            <select
              aria-label="Usuario cuya información se muestra"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              {usuarios.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombre} · {ROL_LABEL[item.rol]}
                </option>
              ))}
            </select>
          ) : (
            <span className="session-name">
              {user.nombre} · {ROL_LABEL[user.rol]}
            </span>
          )}
          {canSeeTeam && visto && visto.id !== user.id ? (
            <span className="session-view">Viendo a {visto.nombre}</span>
          ) : null}
          <button type="button" className="btn ghost sm session-out" onClick={logout}>
            Salir
          </button>
        </div>
      ) : null}
    </div>
  );
}
