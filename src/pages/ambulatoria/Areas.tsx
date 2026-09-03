import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AmbBloque } from '../../components/AmbBloque/AmbBloque';
import { Card } from '../../components/Card/Card';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { Pill } from '../../components/Pill/Pill';
import { useAmbulatoria } from '../../context/AmbulatoriaContext';
import { AMB_NOMBRE_BLOQUE, itemsDeArea } from '../../data/ambulatoria';
import { cuentaArea } from '../../utils/ambulatoria';
import { nivel } from '../../utils/calculations';
import { pct } from '../../utils/format';

export function AmbAreas() {
  const { visita } = useAmbulatoria();
  const navigate = useNavigate();
  const [areaAct, setAreaAct] = useState<string>(visita.areas[0] || '');

  useEffect(() => {
    if (!visita.areas.length) {
      setAreaAct('');
      return;
    }
    if (!visita.areas.includes(areaAct)) setAreaAct(visita.areas[0]);
  }, [visita.areas, areaAct]);

  if (!visita.areas.length) {
    return (
      <Card>
        <EmptyState title="No hay áreas seleccionadas">
          Marque en la pestaña Visita las áreas que existen en la sede.
          <div style={{ marginTop: 14 }}>
            <button type="button" className="btn" onClick={() => navigate('/ambulatoria')}>
              Seleccionar áreas
            </button>
          </div>
        </EmptyState>
      </Card>
    );
  }

  const items = itemsDeArea(areaAct);
  const k = cuentaArea(visita, areaAct);
  const n = nivel(k.pct);

  return (
    <>
      <div className="sticky">
        <div className="chips" style={{ marginBottom: 8 }}>
          {visita.areas.map((area) => {
            const c = cuentaArea(visita, area);
            return (
              <button
                key={area}
                type="button"
                className={`chip ${area === areaAct ? 'on' : ''}`}
                onClick={() => setAreaAct(area)}
              >
                {AMB_NOMBRE_BLOQUE[area] || area}{' '}
                <span className="mono" style={{ opacity: 0.75, fontSize: 11 }}>
                  {c.den + c.NA}/{itemsDeArea(area).length}
                </span>
              </button>
            );
          })}
        </div>
        <div className="row">
          <b>{AMB_NOMBRE_BLOQUE[areaAct] || areaAct}</b>
          <Pill className={n.c}>{k.pct != null ? pct(k.pct) : 'Sin marcar'}</Pill>
        </div>
      </div>
      <AmbBloque
        codigo={areaAct}
        nombre={AMB_NOMBRE_BLOQUE[areaAct] || areaAct}
        items={items}
        scope={areaAct}
      />
    </>
  );
}
