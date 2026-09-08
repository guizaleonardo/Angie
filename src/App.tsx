import type { ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Login } from './pages/Login/Login';
import { Usuarios } from './pages/Usuarios/Usuarios';
import { AmbAreas } from './pages/ambulatoria/Areas';
import { AmbHallazgos } from './pages/ambulatoria/Hallazgos';
import { AmbInforme } from './pages/ambulatoria/Informe';
import { AmbPracticas } from './pages/ambulatoria/Practicas';
import { AmbPuntos } from './pages/ambulatoria/Puntos';
import { AmbVisita } from './pages/ambulatoria/Visita';

function RequireAuth({ children }: { children: ReactNode }) {
  const { ready, user } = useAuth();
  if (!ready) {
    return (
      <div className="login-page">
        <p>Cargando sesión…</p>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <RequireAuth>
                  <Layout />
                </RequireAuth>
              }
            >
              <Route path="/" element={<AmbVisita />} />
              <Route path="/practicas" element={<AmbPracticas />} />
              <Route path="/areas" element={<AmbAreas />} />
              <Route path="/puntos" element={<AmbPuntos />} />
              <Route path="/hallazgos" element={<AmbHallazgos />} />
              <Route path="/informe" element={<AmbInforme />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/ambulatoria" element={<AmbVisita />} />
              <Route path="/ambulatoria/practicas" element={<AmbPracticas />} />
              <Route path="/ambulatoria/areas" element={<AmbAreas />} />
              <Route path="/ambulatoria/puntos" element={<AmbPuntos />} />
              <Route path="/ambulatoria/hallazgos" element={<AmbHallazgos />} />
              <Route path="/ambulatoria/informe" element={<AmbInforme />} />
              <Route path="/tablero" element={<Navigate to="/" replace />} />
              <Route path="/rondas" element={<Navigate to="/" replace />} />
              <Route path="/aplicar" element={<Navigate to="/practicas" replace />} />
              <Route path="/aplicar/:id" element={<Navigate to="/practicas" replace />} />
              <Route path="/datos" element={<Navigate to="/informe" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  );
}
