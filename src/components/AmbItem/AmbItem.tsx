import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Item, ResultadoEstado } from '../../types';
import { resDe } from '../../utils/ambulatoria';
import { useVisita } from '../../context/AmbulatoriaContext';
import { pathOf } from '../../visita/config';
import { ObservationInput } from '../ObservationInput/ObservationInput';
import { StatusSelector } from '../StatusSelector/StatusSelector';

interface AmbItemProps {
  item: Item;
  scope: string;
}

function placeholder(estado?: ResultadoEstado): string {
  if (estado === 'NC') return 'Qué se observó, dónde y con qué evidencia.';
  if (estado === 'NA') return 'Por qué no aplica en esta sede.';
  return 'Observación (opcional).';
}

export function AmbItem({ item, scope }: AmbItemProps) {
  const { visita, config, marcar, setObs, crearPlan, tienePlan } = useVisita();
  const navigate = useNavigate();
  const valor = resDe(visita, scope, item.id);
  const itemRef = useRef<HTMLDivElement>(null);
  const plan = tienePlan(scope, item.id);

  const onEstado = (estado: ResultadoEstado) => {
    marcar(scope, item.id, estado);
    itemRef.current?.scrollIntoView({ block: 'nearest' });
  };

  return (
    <div ref={itemRef} className={`it ${valor.r ? `m${valor.r}` : ''}`} id={`it-${item.id}`}>
      <div className="cab">
        <span className="id">{item.id}</span>
        <div className="tx">
          <div>{item.item}</div>
          <div className="meta">
            <b>Fuente:</b> {item.fuente}
            <br />
            <b>Referencia:</b> {item.referencia}
            {item.nota ? (
              <>
                <br />
                <b>Nota:</b> {item.nota}
              </>
            ) : null}
          </div>
        </div>
        <StatusSelector value={valor.r} onChange={onEstado} />
      </div>
      {valor.r ? (
        <div className="obs">
          <ObservationInput
            value={valor.obs || ''}
            placeholder={placeholder(valor.r)}
            onCommit={(obs) => setObs(scope, item.id, obs)}
          />
          {valor.r === 'NC' ? (
            plan ? (
              <div className="row" style={{ marginTop: 6 }}>
                <span className="pill p-si">Plan formulado</span>
                <button type="button" className="btn quiet sm" onClick={() => navigate(pathOf(config, '/hallazgos'))}>
                  Ver plan
                </button>
              </div>
            ) : (
              <div className="row" style={{ marginTop: 6 }}>
                <button
                  type="button"
                  className="btn sm"
                  onClick={() => {
                    crearPlan(scope, item.id);
                    navigate(pathOf(config, '/hallazgos'));
                  }}
                >
                  Formular plan 5W1H
                </button>
              </div>
            )
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
