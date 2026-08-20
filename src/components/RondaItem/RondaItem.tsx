import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Item, ResultadoEstado, Ronda } from '../../types';
import { ObservationInput } from '../ObservationInput/ObservationInput';
import { StatusSelector } from '../StatusSelector/StatusSelector';

interface RondaItemProps {
  item: Item;
  ronda: Ronda;
  tienePlan: boolean;
  onMarcar: (itemId: string, estado: ResultadoEstado) => void;
  onObservacion: (itemId: string, obs: string) => void;
  onCrearPlan: (itemId: string) => void;
}

function placeholder(estado?: ResultadoEstado): string {
  if (estado === 'NC') return 'Describa el hallazgo: qué se observó, dónde y con qué evidencia.';
  if (estado === 'NA') return 'Justifique por qué el ítem no aplica a este servicio.';
  return 'Observación o evidencia (opcional).';
}

export function RondaItem({
  item,
  ronda,
  tienePlan,
  onMarcar,
  onObservacion,
  onCrearPlan,
}: RondaItemProps) {
  const navigate = useNavigate();
  const valor = ronda.resultados[item.id];
  const itemRef = useRef<HTMLDivElement>(null);

  const onEstado = (estado: ResultadoEstado) => {
    onMarcar(item.id, estado);
    itemRef.current?.scrollIntoView({ block: 'nearest' });
  };

  return (
    <div ref={itemRef} className={`it ${valor?.r ? `m${valor.r}` : ''}`} id={`it-${item.id}`}>
      <div className="cab">
        <span className="id">{item.id}</span>
        <div className="tx">
          <div>{item.item}</div>
          <div className="meta">
            <b>Fuente de verificación:</b> {item.fuente}
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
        <StatusSelector value={valor?.r} onChange={onEstado} />
      </div>
      {valor?.r ? (
        <div className="obs">
          <ObservationInput
            value={valor.obs || ''}
            placeholder={placeholder(valor.r)}
            onCommit={(obs) => onObservacion(item.id, obs)}
          />
          {valor.r === 'NC' ? (
            tienePlan ? (
              <div className="row" style={{ marginTop: 6 }}>
                <span className="pill p-si">Plan de mejoramiento creado</span>
                <button type="button" className="btn quiet sm" onClick={() => navigate('/hallazgos')}>
                  Ver plan
                </button>
              </div>
            ) : (
              <div className="row" style={{ marginTop: 6 }}>
                <button type="button" className="btn sm" onClick={() => onCrearPlan(item.id)}>
                  Crear plan de mejoramiento 5W1H
                </button>
              </div>
            )
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
