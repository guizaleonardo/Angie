import { useMemo, useState } from 'react';
import { Card } from '../../components/Card/Card';
import { DebouncedField } from '../../components/DebouncedField/DebouncedField';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { KPI } from '../../components/KPI/KPI';
import { Pill } from '../../components/Pill/Pill';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { itemPorId } from '../../data/rondas';
import type { FiltroHallazgos, Hallazgo } from '../../types';
import { CRITICIDADES, ESTADOS_HALLAZGO } from '../../types';
import { vencido } from '../../utils/calculations';
import { fmtF } from '../../utils/format';

const FILTROS: Array<[FiltroHallazgos, string]> = [
  ['abiertos', 'Pendientes'],
  ['vencidos', 'Vencidos'],
  ['todos', 'Todos'],
];

const ORDEN_CRITICIDAD: Record<string, number> = { Alta: 0, Media: 1, Baja: 2 };

export function Hallazgos() {
  const { data, generarPendientes, setHallazgoCampo, borrarHallazgo } = useApp();
  const { toast } = useToast();
  const [filtro, setFiltro] = useState<FiltroHallazgos>('abiertos');

  const nc = data.rondas.reduce(
    (acc, ronda) => acc + Object.values(ronda.resultados || {}).filter((v) => v.r === 'NC').length,
    0,
  );
  const sinPlan = nc - data.hallazgos.length;
  const vencidos = data.hallazgos.filter((h) => vencido(h)).length;

  const lista = useMemo(() => {
    let items = data.hallazgos;
    if (filtro === 'abiertos') items = items.filter((x) => x.estado !== 'Cerrado');
    if (filtro === 'vencidos') items = items.filter((x) => vencido(x));
    return [...items].sort(
      (a, b) =>
        Number(vencido(b)) - Number(vencido(a)) ||
        (ORDEN_CRITICIDAD[a.criticidad] ?? 9) - (ORDEN_CRITICIDAD[b.criticidad] ?? 9) ||
        (a.cuando || 'z').localeCompare(b.cuando || 'z'),
    );
  }, [data.hallazgos, filtro]);

  const onGenerar = () => {
    const n = generarPendientes();
    toast(n ? `${n} plan(es) creado(s) desde las no conformidades` : 'Todas las no conformidades ya tienen plan');
  };

  return (
    <>
      <Card>
        <h2>Planes de mejoramiento 5W1H</h2>
        <div className="hint">Cada no conformidad debe tener acción, responsable y fecha. Un plan se cierra solo con evidencia verificada.</div>
        <div className="grid g4">
          <KPI value={data.hallazgos.length} label="Planes registrados" />
          <KPI value={data.hallazgos.filter((x) => x.estado === 'Abierto').length} label="Abiertos" />
          <KPI value={data.hallazgos.filter((x) => x.estado === 'En ejecución').length} label="En ejecución" />
          <KPI value={data.hallazgos.filter((x) => x.estado === 'Cerrado').length} label="Cerrados" />
          <KPI value={vencidos} label="Vencidos" variant={vencidos ? 'riesgo' : ''} />
        </div>
        {sinPlan > 0 ? (
          <div className="aviso" style={{ marginTop: 12 }}>
            Hay {sinPlan} no conformidad(es) sin plan de mejoramiento.
            <button type="button" className="btn sm ghost" style={{ marginLeft: 8 }} onClick={onGenerar}>
              Crear los planes faltantes
            </button>
          </div>
        ) : null}
        <div className="row" style={{ marginTop: 12 }}>
          {FILTROS.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`btn sm ${filtro === key ? '' : 'quiet'}`}
              onClick={() => setFiltro(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </Card>

      {!lista.length ? (
        <Card>
          <EmptyState title="Nada por aquí">
            {data.hallazgos.length ? 'Ningún plan cumple este filtro.' : 'Los planes aparecen cuando marca un ítem como NC.'}
          </EmptyState>
        </Card>
      ) : (
        lista.map((hallazgo) => (
          <HallazgoCard
            key={hallazgo.id}
            hallazgo={hallazgo}
            onChange={setHallazgoCampo}
            onDelete={() => borrarHallazgo(hallazgo.id)}
          />
        ))
      )}
    </>
  );
}

function HallazgoCard({
  hallazgo,
  onChange,
  onDelete,
}: {
  hallazgo: Hallazgo;
  onChange: (id: string, campo: keyof Hallazgo, valor: string) => void;
  onDelete: () => void;
}) {
  const item = itemPorId(hallazgo.itemId);
  const vence = vencido(hallazgo);
  const set = (campo: keyof Hallazgo) => (valor: string) => onChange(hallazgo.id, campo, valor);

  return (
    <Card>
      <div className="row" style={{ alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="row" style={{ gap: 7 }}>
            <span className="mono" style={{ fontWeight: 600, color: 'var(--marca)' }}>{hallazgo.id}</span>
            <Pill className="p-mk">{hallazgo.itemId}</Pill>
            <Pill className={hallazgo.criticidad === 'Alta' ? 'p-no' : hallazgo.criticidad === 'Media' ? 'p-al' : 'p-na'}>
              Criticidad {hallazgo.criticidad}
            </Pill>
            <Pill className={hallazgo.estado === 'Cerrado' ? 'p-si' : hallazgo.estado === 'En ejecución' ? 'p-mk' : 'p-na'}>
              {hallazgo.estado}
            </Pill>
            {vence ? <Pill className="p-no">Vencido</Pill> : null}
          </div>
          <div style={{ marginTop: 7, fontWeight: 500 }}>{item?.item || ''}</div>
          <div className="meta" style={{ fontSize: 11.5, color: 'var(--tinta3)', marginTop: 4 }}>
            {hallazgo.servicio} · Ronda {hallazgo.rondaId} · {fmtF(hallazgo.fecha)}
          </div>
        </div>
        <button type="button" className="btn danger sm" onClick={onDelete}>Eliminar</button>
      </div>
      <div className="grid g2" style={{ marginTop: 12 }}>
        <DebouncedField label="Hallazgo encontrado" value={hallazgo.desc} onCommit={set('desc')} multiline span />
        <DebouncedField label="¿Qué? Acción de mejora" value={hallazgo.que} onCommit={set('que')} multiline />
        <DebouncedField label="¿Por qué? Causa que la justifica" value={hallazgo.porque} onCommit={set('porque')} multiline />
        <DebouncedField label="¿Dónde? Lugar de aplicación" value={hallazgo.donde} onCommit={set('donde')} />
        <DebouncedField label="¿Quién? Responsable" value={hallazgo.quien} onCommit={set('quien')} placeholder="Nombre y cargo" />
        <DebouncedField label="¿Cuándo? Fecha compromiso" value={hallazgo.cuando} onCommit={set('cuando')} type="date" />
        <div>
          <label>Criticidad</label>
          <select value={hallazgo.criticidad} onChange={(e) => onChange(hallazgo.id, 'criticidad', e.target.value)}>
            {CRITICIDADES.map((opcion) => (
              <option key={opcion} value={opcion}>{opcion}</option>
            ))}
          </select>
        </div>
        <DebouncedField label="¿Cómo? Método y recursos" value={hallazgo.como} onCommit={set('como')} multiline span />
        <div>
          <label>Estado</label>
          <select value={hallazgo.estado} onChange={(e) => onChange(hallazgo.id, 'estado', e.target.value)}>
            {ESTADOS_HALLAZGO.map((opcion) => (
              <option key={opcion} value={opcion}>{opcion}</option>
            ))}
          </select>
        </div>
        <DebouncedField label="Fecha de cierre" value={hallazgo.fechaCierre} onCommit={set('fechaCierre')} type="date" />
        <DebouncedField
          label="Evidencia de cierre"
          value={hallazgo.evidencia}
          onCommit={set('evidencia')}
          multiline
          span
          placeholder="Qué documento, registro o reronda demuestra que se cerró."
        />
      </div>
    </Card>
  );
}
