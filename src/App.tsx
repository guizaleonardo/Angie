import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { Aplicar } from './pages/Aplicar/Aplicar';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Datos } from './pages/Datos/Datos';
import { Hallazgos } from './pages/Hallazgos/Hallazgos';
import { Rondas } from './pages/Rondas/Rondas';

export default function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tablero" element={<Navigate to="/" replace />} />
              <Route path="/rondas" element={<Rondas />} />
              <Route path="/aplicar" element={<Aplicar />} />
              <Route path="/aplicar/:id" element={<Aplicar />} />
              <Route path="/hallazgos" element={<Hallazgos />} />
              <Route path="/datos" element={<Datos />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ToastProvider>
  );
}
