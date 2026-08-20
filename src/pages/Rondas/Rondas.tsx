import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { Pill } from '../../components/Pill/Pill';
import { Tira } from '../../components/Tira/Tira';
import { useApp } from '../../context/AppContext';
import { BLOQUES_SERVICIO, itemsDeServicio } from '../../data/rondas';
import type { Ronda } from '../../types';
import { conteo, nivel } from '../../utils/calculations';
import { fmtF, hoy, pct } from '../../utils/format';

export function Rondas() {
  const { data, crearRonda, borrarRonda } = useApp();
  const navigate = useNavigate();
  const [servicioCod, setServicioCod] = useState(BLOQUES_SERVICIO[0]?.codigo ?? 'F');
  const [fecha, setFecha] = useState(hoy());
  const [lider, setLider] = useState('');
  const [acompanantes, setAcompanantes] = useState('');

  const onCrear = () => {
    const ronda = crearRonda({ servicioCod, fecha, lider, acompanantes });
    navigate(`/aplicar/${ronda.id}`);
  };

  const ordenadas = [...data.rondas].sort((a, b) => (b.fecha || '').localeCompare(a.fecha || ''));

  return (
    <>
      <Card>
        <h2>Programar una ronda</h2>
        <div className="hint">Se cargan automáticamente los bloques transversales A–E más el módulo del servicio seleccionado.</div>
        <div className="grid g2">
          <div>
            <label htmlFor="f-serv">Servicio a auditar</label>
            <select id="f-serv" value={servicioCod} onChange={(e) => setServicioCod(e.target.value)}>
              {BLOQUES_SERVICIO.map((servicio) => (
                <option key={servicio.codigo} value={servicio.codigo}>
                  {servicio.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-fecha">Fecha</label>
            <input id="f-fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>
          <div>
            <label htmlFor="f-lider">Líder de la ronda</label>
            <input
              id="f-lider"
              value={lider}
              placeholder="Nombre y cargo"
              onChange={(e) => setLider(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="f-acomp">Acompañantes</label>
            <input
              id="f-acomp"
              value={acompanantes}
              placeholder="Quiénes participaron"
              onChange={(e) => setAcompanantes(e.target.value)}
            />
          </div>
        </div>
        <div className="row" style={{ marginTop: 12 }}>
          <button type="button" className="btn" onClick={onCrear}>
            Crear ronda
          </button>
        </div>
      </Card>

      {!data.rondas.length ? (
        <Card>
          <EmptyState title="Sin rondas registradas">La primera que cree aparecerá aquí.</EmptyState>
        </Card>
      ) : (
        <Card>
          <h2>Rondas registradas</h2>
          <div className="hint">{data.rondas.length} en total. La tira de color muestra cada ítem verificado.</div>
          {ordenadas.map((ronda) => (
            <RondaListItem
              key={ronda.id}
              ronda={ronda}
              onAplicar={() => navigate(`/aplicar/${ronda.id}`)}
              onEliminar={() => borrarRonda(ronda.id)}
            />
          ))}
        </Card>
      )}
    </>
  );
}

function RondaListItem({
  ronda,
  onAplicar,
  onEliminar,
}: {
  ronda: Ronda;
  onAplicar: () => void;
  onEliminar: () => void;
}) {
  const c = conteo(ronda);
  const nv = nivel(c.pct);
  const items = itemsDeServicio(ronda.servicioCod);

  return (
    <div className="it" style={{ marginTop: 10 }}>
      <div className="cab">
        <div className="tx">
          <div className="row" style={{ gap: 8 }}>
            <span className="mono" style={{ fontWeight: 600, color: 'var(--marca)' }}>{ronda.id}</span>
            <b>{ronda.servicio}</b>
            <Pill className={nv.c}>
              {nv.t}
              {c.pct != null ? ` · ${pct(c.pct)}` : ''}
            </Pill>
            {c.den + c.NA < c.total ? (
              <Pill className="p-al">En curso · {c.den + c.NA}/{c.total}</Pill>
            ) : (
              <Pill className="p-si">Completa</Pill>
            )}
          </div>
          <div className="meta">
            {fmtF(ronda.fecha)} · Líder: {ronda.lider || '—'}
            {ronda.acompanantes ? ` · Acompañantes: ${ronda.acompanantes}` : ''}
            <br />
            Cumple {c.C} · No cumple {c.NC} · No aplica {c.NA}
          </div>
          <Tira items={items} resultados={ronda.resultados} />
        </div>
        <div className="row" style={{ flexDirection: 'column', gap: 5, alignItems: 'stretch' }}>
          <button type="button" className="btn sm" onClick={onAplicar}>Aplicar</button>
          <button type="button" className="btn sm danger" onClick={onEliminar}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}
