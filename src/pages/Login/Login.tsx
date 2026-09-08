import { type FormEvent, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { BrandLogo } from '../../components/BrandLogo/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { ApiError } from '../../services/api';

export function Login() {
  const { user, ready, login } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (ready && user) return <Navigate to={from} replace />;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(email.trim(), password);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo iniciar sesión');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={onSubmit}>
        <BrandLogo />
        <h1>Rondas de seguridad</h1>
        <p className="hint">Ingrese con su usuario. El JWT determina qué información puede ver.</p>
        <label htmlFor="login-email">Correo</label>
        <input
          id="login-email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="login-pass">Contraseña</label>
        <input
          id="login-pass"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error ? <div className="login-error">{error}</div> : null}
        <button type="submit" className="btn" disabled={busy}>
          {busy ? 'Ingresando…' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
}
