import type { Item } from '../../types';
import { cuenta } from '../../utils/ambulatoria';
import { nivel } from '../../utils/calculations';
import { pct } from '../../utils/format';
import { useVisita } from '../../context/AmbulatoriaContext';
import { AmbItem } from '../AmbItem/AmbItem';
import { Pill } from '../Pill/Pill';

interface AmbBloqueProps {
  codigo: string;
  nombre: string;
  items: Item[];
  scope: string;
}

export function AmbBloque({ codigo, nombre, items, scope }: AmbBloqueProps) {
  const { visita } = useVisita();
  if (!items.length) return null;
  const map = scope === 'T' ? visita.transv : visita.areasRes[scope] || {};
  const k = cuenta(map, items.map((i) => i.id));

  return (
    <div className="blq">
      <h3>
        <span className="mono">{codigo}</span> {nombre}
        <Pill className="p-na">
          {k.den + k.NA}/{items.length}
        </Pill>
        {k.den ? <Pill className={nivel(k.pct).c}>{pct(k.pct)}</Pill> : null}
      </h3>
      {items.map((item) => (
        <AmbItem key={item.id} item={item} scope={scope} />
      ))}
    </div>
  );
}
