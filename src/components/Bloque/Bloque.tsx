import type { Bloque as BloqueTipo, Item, ResultadoEstado, Ronda } from '../../types';
import { conteoBloqueEnRonda, nivel } from '../../utils/calculations';
import { pct } from '../../utils/format';
import { Pill } from '../Pill/Pill';
import { RondaItem } from '../RondaItem/RondaItem';

interface BloqueProps {
  bloque: BloqueTipo;
  items: Item[];
  ronda: Ronda;
  tieneHallazgo: (itemId: string) => boolean;
  onMarcar: (itemId: string, estado: ResultadoEstado) => void;
  onObservacion: (itemId: string, obs: string) => void;
  onCrearPlan: (itemId: string) => void;
}

export function Bloque({
  bloque,
  items,
  ronda,
  tieneHallazgo,
  onMarcar,
  onObservacion,
  onCrearPlan,
}: BloqueProps) {
  if (!items.length) return null;
  const { C, NC } = conteoBloqueEnRonda(ronda, items);
  const cumplimiento = C + NC ? C / (C + NC) : null;

  return (
    <div className="blq">
      <h3>
        <span className="mono">{bloque.codigo}</span> {bloque.nombre}
        <Pill className={bloque.tipo === 'transversal' ? 'p-mk' : 'p-na'}>
          {bloque.tipo === 'transversal' ? 'Transversal' : 'Módulo del servicio'}
        </Pill>
        {cumplimiento != null ? (
          <Pill className={nivel(cumplimiento).c}>{pct(cumplimiento)}</Pill>
        ) : null}
      </h3>
      {items.map((item) => (
        <RondaItem
          key={item.id}
          item={item}
          ronda={ronda}
          tienePlan={tieneHallazgo(item.id)}
          onMarcar={onMarcar}
          onObservacion={onObservacion}
          onCrearPlan={onCrearPlan}
        />
      ))}
    </div>
  );
}
