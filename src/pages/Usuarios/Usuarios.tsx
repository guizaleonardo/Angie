import { type FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { api, ApiError } from '../../services/api';
import type { Rol, Usuario } from '../../types/user';
import { ROL_LABEL } from '../../types/user';

const EMPTY_FORM = {
  nombre: '',
  email: '',
  password: '',
  rol: 'asistente' as Rol,
  reportsTo: '',
};

export function Usuarios() {
  const { user, usuarios, refreshUsuarios, setSelectedUserId, canManageUsers, canSeeTeam } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [editing, setEditing] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const lideres = useMemo(() => usuarios.filter((u) => u.rol === 'lider' && u.activo), [usuarios]);
  const rolesDisponibles: Rol[] =
    user?.rol === 'admin' ? ['admin', 'lider', 'asistente'] : ['asistente'];

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canManageUsers) return;
    setBusy(true);
    try {
      const payload = {
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        password: form.password,
        rol: user?.rol === 'lider' ? 'asistente' : form.rol,
        reportsTo: form.rol === 'asistente' || user?.rol === 'lider' ? form.reportsTo || user?.id : null,
      };
      if (editing) {
        const patch: Record<string, unknown> = {
          nombre: payload.nombre,
          email: payload.email,
          rol: payload.rol,
          reportsTo: payload.reportsTo,
        };
        if (payload.password) patch.password = payload.password;
        await api(`/usuarios/${editing}`, { method: 'PATCH', body: JSON.stringify(patch) });
        toast('Usuario actualizado');
      } else {
        if (!payload.password) throw new ApiError(400, 'La contraseña es obligatoria');
        await api('/usuarios', { method: 'POST', body: JSON.stringify(payload) });
        toast('Usuario creado');
      }
      setForm(EMPTY_FORM);
      setEditing(null);
      await refreshUsuarios();
    } catch (err) {
      toast(err instanceof ApiError ? err.message : 'No se pudo guardar el usuario');
    } finally {
      setBusy(false);
    }
  };

  const onEdit = (item: Usuario) => {
    setEditing(item.id);
    setForm({
      nombre: item.nombre,
      email: item.email,
      password: '',
      rol: item.rol,
      reportsTo: item.reportsTo || '',
    });
  };

  const onDelete = async (item: Usuario) => {
    if (!window.confirm(`¿Eliminar a ${item.nombre}?`)) return;
    try {
      await api(`/usuarios/${item.id}`, { method: 'DELETE' });
      toast('Usuario eliminado');
      if (editing === item.id) {
        setEditing(null);
        setForm(EMPTY_FORM);
      }
      await refreshUsuarios();
    } catch (err) {
      toast(err instanceof ApiError ? err.message : 'No se pudo eliminar');
    }
  };

  const verInformacion = (id: string) => {
    setSelectedUserId(id);
    navigate('/');
  };

  const alcance =
    user?.rol === 'admin'
      ? 'Ve la información de todos los usuarios.'
      : user?.rol === 'lider'
        ? 'Ve su información y la de los asistentes que le reportan.'
        : 'Solo ve su propia información.';

  return (
    <>
      <Card>
        <h2>Usuarios y perfiles</h2>
        <div className="hint">{alcance}</div>
        {!usuarios.length ? (
          <EmptyState title="Sin usuarios visibles">No hay cuentas en su alcance.</EmptyState>
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Perfil</th>
                  <th>Reporta a</th>
                  <th>Estado</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {usuarios.map((item) => (
                  <tr key={item.id} className={item.id === user?.id ? 'is-me' : ''}>
                    <td>
                      {item.nombre}
                      {item.id === user?.id ? ' (usted)' : ''}
                    </td>
                    <td>{item.email}</td>
                    <td>{ROL_LABEL[item.rol]}</td>
                    <td>{item.liderNombre || (item.rol === 'asistente' ? '—' : '—')}</td>
                    <td>{item.activo ? 'Activo' : 'Inactivo'}</td>
                    <td>
                      <div className="row">
                        {canSeeTeam ? (
                          <button type="button" className="btn ghost sm" onClick={() => verInformacion(item.id)}>
                            Ver información
                          </button>
                        ) : null}
                        {canManageUsers && (user?.rol === 'admin' || item.rol === 'asistente' || item.id === user?.id) ? (
                          <button type="button" className="btn quiet sm" onClick={() => onEdit(item)}>
                            Editar
                          </button>
                        ) : null}
                        {canManageUsers && item.id !== user?.id && (user?.rol === 'admin' || item.rol === 'asistente') ? (
                          <button type="button" className="btn danger sm" onClick={() => onDelete(item)}>
                            Eliminar
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {canManageUsers ? (
        <Card>
          <h2>{editing ? `Editar ${editing}` : 'Nuevo usuario'}</h2>
          <div className="hint">
            {user?.rol === 'lider'
              ? 'Como líder solo puede crear asistentes que le reportan a usted.'
              : 'Admin puede crear cualquier perfil. El asistente debe reportar a un líder.'}
          </div>
          <form onSubmit={onSubmit}>
            <div className="grid g2">
              <div>
                <label htmlFor="u-nombre">Nombre</label>
                <input
                  id="u-nombre"
                  value={form.nombre}
                  onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label htmlFor="u-email">Correo</label>
                <input
                  id="u-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label htmlFor="u-pass">Contraseña {editing ? '(dejar vacía para no cambiar)' : ''}</label>
                <input
                  id="u-pass"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  minLength={editing ? 0 : 6}
                  required={!editing}
                />
              </div>
              <div>
                <label htmlFor="u-rol">Perfil</label>
                <select
                  id="u-rol"
                  value={user?.rol === 'lider' ? 'asistente' : form.rol}
                  disabled={user?.rol === 'lider'}
                  onChange={(e) => setForm((f) => ({ ...f, rol: e.target.value as Rol }))}
                >
                  {rolesDisponibles.map((rol) => (
                    <option key={rol} value={rol}>
                      {ROL_LABEL[rol]}
                    </option>
                  ))}
                </select>
              </div>
              {(form.rol === 'asistente' || user?.rol === 'lider') && user?.rol === 'admin' ? (
                <div>
                  <label htmlFor="u-lider">Líder al que reporta</label>
                  <select
                    id="u-lider"
                    value={form.reportsTo}
                    onChange={(e) => setForm((f) => ({ ...f, reportsTo: e.target.value }))}
                    required
                  >
                    <option value="">Seleccione un líder</option>
                    {lideres.map((lider) => (
                      <option key={lider.id} value={lider.id}>
                        {lider.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
            </div>
            <div className="row" style={{ marginTop: 12 }}>
              <button type="submit" className="btn" disabled={busy}>
                {editing ? 'Guardar cambios' : 'Crear usuario'}
              </button>
              {editing ? (
                <button
                  type="button"
                  className="btn quiet"
                  onClick={() => {
                    setEditing(null);
                    setForm(EMPTY_FORM);
                  }}
                >
                  Cancelar
                </button>
              ) : null}
            </div>
          </form>
        </Card>
      ) : null}
    </>
  );
}
