import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { VisitaProvider } from '../../context/AmbulatoriaContext';
import { AMBULATORIA_CONFIG, PRINCIPAL_CONFIG } from '../../visita/config';
import { Header } from '../Header/Header';
import { Navigation } from '../Navigation/Navigation';

export function Layout() {
  const { pathname } = useLocation();
  const ambulatoria = pathname.startsWith('/ambulatoria');
  const config = ambulatoria ? AMBULATORIA_CONFIG : PRINCIPAL_CONFIG;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <VisitaProvider key={config.id} config={config}>
      <div id="rsp">
        <Header />
        <Navigation />
        <div className="wrap">
          <Outlet />
        </div>
      </div>
    </VisitaProvider>
  );
}
