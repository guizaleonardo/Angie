import { useNavigate } from 'react-router-dom';
import { AmbBloque } from '../../components/AmbBloque/AmbBloque';
import { Pill } from '../../components/Pill/Pill';
import { useVisita } from '../../context/AmbulatoriaContext';
import { cuentaTransv } from '../../utils/ambulatoria';
import { nivel } from '../../utils/calculations';
import { pct } from '../../utils/format';
import { pathOf } from '../../visita/config';

export function AmbPracticas() {
  const { visita, config } = useVisita();
  const navigate = useNavigate();
  const items = config.itemsTransversales(visita);
  const k = cuentaTransv(visita, config);
  const n = nivel(k.pct);
  const bloques = config.bloquesTransversales.filter((b) => items.some((i) => i.bloque === b.codigo));

  return (
    <>
      <div className="sticky">
        <div className="row">
          <b>Prácticas seguras transversales</b>
          <Pill className="p-na">
            {k.den + k.NA} de {items.length}
          </Pill>
          <Pill className={n.c}>{k.pct != null ? pct(k.pct) : 'Sin marcar'}</Pill>
          <div className="spacer" />
          <button type="button" className="btn quiet sm" onClick={() => navigate(pathOf(config, '/areas'))}>
            Pasar a las áreas
          </button>
        </div>
      </div>
      <div className="aviso">{config.avisoPracticas}</div>
      {bloques.map((bloque) => (
        <AmbBloque
          key={bloque.codigo}
          codigo={bloque.codigo}
          nombre={bloque.nombre}
          items={items.filter((i) => i.bloque === bloque.codigo)}
          scope="T"
        />
      ))}
    </>
  );
}
