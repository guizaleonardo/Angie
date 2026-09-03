import { useNavigate } from 'react-router-dom';
import { AmbBloque } from '../../components/AmbBloque/AmbBloque';
import { Pill } from '../../components/Pill/Pill';
import { useAmbulatoria } from '../../context/AmbulatoriaContext';
import { AMB_BLOQUES_TRANSVERSALES, itemsTransversales } from '../../data/ambulatoria';
import { cuentaTransv } from '../../utils/ambulatoria';
import { nivel } from '../../utils/calculations';
import { pct } from '../../utils/format';

export function AmbPracticas() {
  const { visita } = useAmbulatoria();
  const navigate = useNavigate();
  const items = itemsTransversales();
  const k = cuentaTransv(visita);
  const n = nivel(k.pct);

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
          <button type="button" className="btn quiet sm" onClick={() => navigate('/ambulatoria/areas')}>
            Pasar a las áreas
          </button>
        </div>
      </div>
      <div className="aviso">
        Se verifican una sola vez para toda la sede. Incluyen identificación del paciente, IAAS e higiene de manos,
        medicamentos, riesgo del paciente, historia clínica y el bloque de rotulación y trazabilidad.
      </div>
      {AMB_BLOQUES_TRANSVERSALES.map((bloque) => (
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
