import { useMemo, useState } from 'react';
import { Card } from '../../components/Card/Card';
import { DebouncedField } from '../../components/DebouncedField/DebouncedField';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { KPI } from '../../components/KPI/KPI';
import { Pill } from '../../components/Pill/Pill';
import { useVisita } from '../../context/AmbulatoriaContext';
import { useToast } from '../../context/ToastContext';
import { CRITICIDADES } from '../../types';
import type { FiltroHallazgosAmb, HallazgoAmb, HallazgoAmbCampo } from '../../types/ambulatoria';
import { sinValidar, totalNC } from '../../utils/ambulatoria';

const FILTROS: Array<[FiltroHallazgosAmb, string]> = [
  ['todos', 'Todos'],
  ['alta', 'Criticidad alta'],
  ['sinval', 'Sin validar'],
];

const ORDEN: Record<string, number> = { Alta: 0, Media: 1, Baja: 2 };

export function AmbHallazgos() {
  const { visita, config, generarPendientes, setHallazgoCampo, validarHallazgo, borrarHallazgo } = useVisita();
  const { toast } = useToast();
  const [filtro, setFiltro] = useState<FiltroHallazgosAmb>('todos');
  const nc = totalNC(visita, config);
  const pendientes = nc - visita.hallazgos.length;
  const sinVal = sinValidar(visita);

  const lista = useMemo(() => {
    let items = visita.hallazgos;
    if (filtro === 'alta') items = items.filter((x) => x.criticidad === 'Alta');
    if (filtro === 'sinval') items = items.filter((x) => x.sugerido);
    return [...items].sort((a, b) => (ORDEN[a.criticidad] ?? 9) - (ORDEN[b.criticidad] ?? 9));
  }, [visita.hallazgos, filtro]);

  const onGenerar = () => {
    const n = generarPendientes();
    toast(n ? `${n} plan(es) generado(s) — revíselos y valídelos` : 'Todas las no conformidades ya tienen plan');
  };

  return (
    <>
      <Card>
        <h2>Hallazgos y planes de mejoramiento</h2>
        <div className="hint">
          Cada no conformidad de la sede con su plan 5W1H. Los textos autogenerados quedan marcados hasta que usted los
          valide.
        </div>
        <div className="grid g4">
          <KPI value={nc} label="No conformidades" />
          <KPI value={visita.hallazgos.length} label="Planes" />
          <KPI value={visita.hallazgos.filter((x) => x.criticidad === 'Alta').length} label="Criticidad alta" />
          <KPI value={sinVal} label="Sin validar" variant={sinVal ? 'riesgo' : ''} />
        </div>
        {pendientes > 0 ? (
          <div className="aviso" style={{ marginTop: 12 }}>
            Hay {pendientes} no conformidad(es) sin plan.
            <button type="button" className="btn sm ghost" style={{ marginLeft: 8 }} onClick={onGenerar}>
              Generar los planes faltantes
            </button>
          </div>
        ) : null}
        {sinVal ? (
          <div className="aviso" style={{ marginTop: 12 }}>
            <b>{sinVal} plan(es) siguen como propuesta automática.</b> El campo ¿POR QUÉ? trae hipótesis, no la causa:
            reemplácelo por lo que confirmó en sitio antes de radicar el informe.
          </div>
        ) : null}
        <div className="row" style={{ marginTop: 12 }}>
          {FILTROS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={`btn ${filtro === id ? '' : 'quiet'} sm`}
              onClick={() => setFiltro(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </Card>

      {!lista.length ? (
        <Card>
          <EmptyState title="Nada por aquí">Los planes aparecen cuando marca un ítem como NC.</EmptyState>
        </Card>
      ) : (
        lista.map((h) => (
          <HallazgoAmbCard
            key={h.id}
            hallazgo={h}
            onChange={setHallazgoCampo}
            onValidar={() => validarHallazgo(h.id)}
            onBorrar={() => borrarHallazgo(h.id)}
          />
        ))
      )}
    </>
  );
}

function HallazgoAmbCard({
  hallazgo,
  onChange,
  onValidar,
  onBorrar,
}: {
  hallazgo: HallazgoAmb;
  onChange: (id: string, campo: HallazgoAmbCampo, valor: string) => void;
  onValidar: () => void;
  onBorrar: () => void;
}) {
  const { config } = useVisita();
  const item = config.itemPorId(hallazgo.itemId);
  const set = (campo: HallazgoAmbCampo) => (valor: string) => onChange(hallazgo.id, campo, valor);

  return (
    <Card>
      <div className="row" style={{ alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="row" style={{ gap: 7 }}>
            <span className="mono" style={{ fontWeight: 600, color: 'var(--marca)' }}>
              {hallazgo.id}
            </span>
            <Pill className="p-mk">{hallazgo.itemId}</Pill>
            <Pill className={hallazgo.criticidad === 'Alta' ? 'p-no' : hallazgo.criticidad === 'Media' ? 'p-al' : 'p-na'}>
              {hallazgo.criticidad}
            </Pill>
            <Pill className="p-na">{hallazgo.area}</Pill>
            {hallazgo.sugerido ? <Pill className="p-al">Propuesta sin validar</Pill> : null}
          </div>
          <div style={{ marginTop: 7, fontWeight: 500 }}>{item?.item || ''}</div>
        </div>
        <div className="row" style={{ flexDirection: 'column', gap: 5, alignItems: 'stretch' }}>
          {hallazgo.sugerido ? (
            <button type="button" className="btn sm" onClick={onValidar}>
              Validar
            </button>
          ) : null}
          <button type="button" className="btn danger sm" onClick={onBorrar}>
            Eliminar
          </button>
        </div>
      </div>
      <div className="grid g2" style={{ marginTop: 12 }}>
        <DebouncedField label="Hallazgo encontrado" value={hallazgo.desc} multiline span onCommit={set('desc')} />
        <DebouncedField label="¿Qué? Acción de mejora" value={hallazgo.que} multiline onCommit={set('que')} />
        <DebouncedField label="¿Por qué? Causa confirmada" value={hallazgo.porque} multiline onCommit={set('porque')} />
        <DebouncedField label="¿Dónde?" value={hallazgo.donde} onCommit={set('donde')} />
        <DebouncedField label="¿Quién? Responsable" value={hallazgo.quien} onCommit={set('quien')} />
        <DebouncedField label="¿Cuándo? Fecha compromiso" type="date" value={hallazgo.cuando} onCommit={set('cuando')} />
        <div>
          <label htmlFor={`crit-${hallazgo.id}`}>Criticidad</label>
          <select
            id={`crit-${hallazgo.id}`}
            value={hallazgo.criticidad}
            onChange={(event) => onChange(hallazgo.id, 'criticidad', event.target.value)}
          >
            {CRITICIDADES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <DebouncedField label="¿Cómo? Método y recursos" value={hallazgo.como} multiline span onCommit={set('como')} />
      </div>
    </Card>
  );
}
