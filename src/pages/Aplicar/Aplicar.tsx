import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Bloque } from '../../components/Bloque/Bloque';
import { Card } from '../../components/Card/Card';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { ObservationInput } from '../../components/ObservationInput/ObservationInput';
import { Pill } from '../../components/Pill/Pill';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { BLOQUES, itemsDeServicio } from '../../data/rondas';
import { abrirActa } from '../../services/acta';
import { conteo, nivel } from '../../utils/calculations';
import { fmtF, pct } from '../../utils/format';

export function Aplicar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    data,
    marcar,
    setObservacionItem,
    setObservacionRonda,
    marcarTodo,
    limpiarResultados,
    crearHallazgo,
    tieneHallazgo,
  } = useApp();

  const ronda = data.rondas.find((x) => x.id === id) || data.rondas[data.rondas.length - 1];

  useEffect(() => {
    if (ronda && id !== ronda.id) {
      navigate(`/aplicar/${ronda.id}`, { replace: true });
    }
  }, [id, ronda, navigate]);

  if (!ronda) {
    return (
      <Card>
        <EmptyState title="No hay ninguna ronda abierta">
          Programe una ronda para empezar a verificar.
          <div style={{ marginTop: 14 }}>
            <button type="button" className="btn" onClick={() => navigate('/rondas')}>
              Ir a Rondas
            </button>
          </div>
        </EmptyState>
      </Card>
    );
  }

  const items = itemsDeServicio(ronda.servicioCod);
  const c = conteo(ronda, items);
  const nv = nivel(c.pct);

  const onCrearPlan = (itemId: string) => {
    crearHallazgo(ronda.id, itemId);
    navigate('/hallazgos');
  };

  const onActa = () => {
    if (!abrirActa(ronda, data.hallazgos)) {
      toast('El navegador bloqueó la ventana. Permita las ventanas emergentes.');
    }
  };

  return (
    <>
      <div className="sticky">
        <div className="row">
          <span className="mono" style={{ fontWeight: 600, color: 'var(--marca)' }}>{ronda.id}</span>
          <b>{ronda.servicio}</b>
          <span style={{ color: 'var(--tinta3)' }}>{fmtF(ronda.fecha)}</span>
          <Pill className={nv.c}>
            {c.pct != null ? pct(c.pct) : 'Sin marcar'} · {nv.t}
          </Pill>
          <Pill className="p-na">{c.den + c.NA} de {c.total}</Pill>
          <div className="spacer" />
          {data.rondas.length > 1 ? (
            <select
              value={ronda.id}
              onChange={(e) => navigate(`/aplicar/${e.target.value}`)}
              style={{ maxWidth: 320 }}
            >
              {data.rondas.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.id} · {x.servicio} · {fmtF(x.fecha)}
                </option>
              ))}
            </select>
          ) : null}
          <button type="button" className="btn ghost sm" onClick={() => marcarTodo(ronda.id, 'C')}>
            Marcar todo como cumple
          </button>
          <button type="button" className="btn quiet sm" onClick={() => limpiarResultados(ronda.id)}>
            Limpiar
          </button>
        </div>
      </div>

      {BLOQUES.map((bloque) => (
        <Bloque
          key={bloque.codigo}
          bloque={bloque}
          items={items.filter((item) => item.bloque === bloque.codigo)}
          ronda={ronda}
          tieneHallazgo={(itemId) => tieneHallazgo(ronda.id, itemId)}
          onMarcar={(itemId, estado) => marcar(ronda.id, itemId, estado)}
          onObservacion={(itemId, obs) => setObservacionItem(ronda.id, itemId, obs)}
          onCrearPlan={onCrearPlan}
        />
      ))}

      <Card>
        <label htmlFor="obs-gen">Observación general de la ronda</label>
        <ObservationInput
          id="obs-gen"
          value={ronda.obs || ''}
          placeholder="Conclusión de la ronda, compromisos acordados en sitio, personal entrevistado."
          onCommit={(obs) => setObservacionRonda(ronda.id, obs)}
          minHeight={60}
        />
        <div className="row" style={{ marginTop: 12 }}>
          <button type="button" className="btn ghost" onClick={() => navigate('/hallazgos')}>
            Ir a los planes de mejoramiento
          </button>
          <button type="button" className="btn quiet" onClick={onActa}>
            Generar acta para imprimir
          </button>
        </div>
      </Card>
    </>
  );
}
