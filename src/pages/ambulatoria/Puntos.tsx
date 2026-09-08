import { useState } from 'react';
import { Bar } from '../../components/Bar/Bar';
import { Card } from '../../components/Card/Card';
import { KPI } from '../../components/KPI/KPI';
import { Pill } from '../../components/Pill/Pill';
import { PuntosMatriz } from '../../components/PuntosMatriz/PuntosMatriz';
import { useVisita } from '../../context/AmbulatoriaContext';
import { CARGOS, CHK_HM, CHK_RT, MOMENTOS } from '../../data/ambulatoria';
import type { AccionHigiene } from '../../types/ambulatoria';
import { adherencia, puntosResumen } from '../../utils/ambulatoria';
import { pct } from '../../utils/format';

function ResumenPuntos({
  resumen,
  chk,
}: {
  resumen: ReturnType<typeof puntosResumen>;
  chk: readonly string[];
}) {
  const peor = resumen.fallas
    .map((f, i) => ({ n: chk[i], f }))
    .filter((x) => x.f)
    .sort((a, b) => b.f - a.f);

  return (
    <>
      <div className="grid g4" style={{ marginTop: 12 }}>
        <KPI value={resumen.eval} label="Puntos verificados" />
        <KPI value={resumen.conf} label="Conformes" />
        <KPI value={resumen.eval - resumen.conf} label="No conformes" variant={resumen.eval - resumen.conf ? 'riesgo' : ''} />
        <KPI value={pct(resumen.pct)} label="% de conformidad" variant="acento" />
      </div>
      {peor.length ? (
        <div className="row" style={{ marginTop: 10 }}>
          <span style={{ fontSize: 12, color: 'var(--tinta3)' }}>Elemento que más falta:</span>
          {peor.slice(0, 3).map((x) => (
            <Pill key={x.n} className="p-no">
              {x.n} · {x.f}
            </Pill>
          ))}
        </div>
      ) : null}
    </>
  );
}

export function AmbPuntos() {
  const { visita, addObsHM, delObsHM } = useVisita();
  const [obsCargo, setObsCargo] = useState<string>('Médico');
  const [obsMomento, setObsMomento] = useState('1');
  const g = adherencia(visita.obsHM);
  const ult = [...visita.obsHM].slice(-8).reverse();
  const rh = puntosResumen(visita.puntosHM, CHK_HM);
  const rr = puntosResumen(visita.puntosRT, CHK_RT);
  const momentoTxt = (MOMENTOS.find((m) => m[0] === obsMomento) || [])[1] || '';

  const onAccion = (accion: AccionHigiene) => addObsHM(obsCargo, obsMomento, accion);

  return (
    <>
      <Card>
        <h2>Observación de higiene de manos (metodología OMS)</h2>
        <div className="hint">
          Seleccione el cargo y el momento, y registre lo que observó. Una oportunidad = un momento en que estaba
          indicada la higiene. Adherencia = (fricción + lavado) ÷ oportunidades observadas. Se recomienda un mínimo de
          20 oportunidades por sede.
        </div>
        <div className="grid g2">
          <div>
            <label htmlFor="obs-cargo">Cargo observado</label>
            <select id="obs-cargo" value={obsCargo} onChange={(event) => setObsCargo(event.target.value)}>
              {CARGOS.map((cargo) => (
                <option key={cargo} value={cargo}>
                  {cargo}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Momento de la OMS</label>
            <div className="chips">
              {MOMENTOS.map((m) => (
                <button
                  key={m[0]}
                  type="button"
                  className={`chip ${obsMomento === m[0] ? 'on' : ''}`}
                  title={m[1]}
                  onClick={() => setObsMomento(m[0])}
                >
                  {m[0]}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--tinta3)', marginTop: 5 }}>{momentoTxt}</div>
          </div>
        </div>
        <div className="row" style={{ marginTop: 12 }}>
          <button type="button" className="btn" style={{ flex: 1 }} onClick={() => onAccion('FR')}>
            Fricción con alcohol
          </button>
          <button type="button" className="btn" style={{ flex: 1 }} onClick={() => onAccion('LM')}>
            Lavado con agua y jabón
          </button>
          <button type="button" className="btn danger" style={{ flex: 1 }} onClick={() => onAccion('OM')}>
            Omisión
          </button>
        </div>
        <div className="grid g4" style={{ marginTop: 14 }}>
          <KPI value={g.n} label="Oportunidades" />
          <KPI value={g.fr} label="Fricción" />
          <KPI value={g.lm} label="Lavado" />
          <KPI value={g.om} label="Omisiones" variant={g.om ? 'riesgo' : ''} />
          <KPI value={pct(g.pct)} label="Adherencia" variant="acento" />
        </div>
        {g.n > 0 && g.n < 20 ? (
          <div className="aviso" style={{ marginTop: 12 }}>
            Lleva {g.n} oportunidades. Con menos de 20 el porcentaje no es representativo de la sede.
          </div>
        ) : null}
        {g.n ? (
          <>
            <div className="tbl-scroll" style={{ marginTop: 14 }}>
              <table>
                <thead>
                  <tr>
                    <th>Momento</th>
                    <th>Oport.</th>
                    <th>Adherencia</th>
                  </tr>
                </thead>
                <tbody>
                  {MOMENTOS.map((m) => {
                    const a = adherencia(visita.obsHM, (o) => o.momento === m[0]);
                    return (
                      <tr key={m[0]}>
                        <td>
                          <b>{m[0]}</b> · {m[1]}
                        </td>
                        <td className="cifra">{a.n}</td>
                        <td>{a.n ? <Bar value={a.pct} /> : '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="tbl-scroll" style={{ marginTop: 10 }}>
              <table>
                <thead>
                  <tr>
                    <th>Cargo</th>
                    <th>Oport.</th>
                    <th>Adherencia</th>
                  </tr>
                </thead>
                <tbody>
                  {CARGOS.map((cargo) => {
                    const a = adherencia(visita.obsHM, (o) => o.cargo === cargo);
                    if (!a.n) return null;
                    return (
                      <tr key={cargo}>
                        <td>{cargo}</td>
                        <td className="cifra">{a.n}</td>
                        <td>
                          <Bar value={a.pct} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
        {ult.length ? (
          <div style={{ marginTop: 12 }}>
            <label>Últimas oportunidades registradas</label>
            {ult.map((o) => (
              <div key={o.id} className="row" style={{ gap: 6, padding: '4px 0', borderBottom: '1px solid var(--linea)' }}>
                <Pill className={o.accion === 'OM' ? 'p-no' : 'p-si'}>
                  {o.accion === 'FR' ? 'Fricción' : o.accion === 'LM' ? 'Lavado' : 'Omisión'}
                </Pill>
                <span style={{ fontSize: 12.5 }}>
                  {o.cargo} · momento {o.momento}
                </span>
                <div className="spacer" />
                <button type="button" className="btn danger sm" onClick={() => delObsHM(o.id)}>
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </Card>

      <Card>
        <h2>Insumos de higiene de manos por punto de atención</h2>
        <div className="hint">
          Recorra la sede y registre cada lavamanos o punto de atención. Un punto es conforme si no le falta ningún
          elemento. Esto sustenta el ítem de higiene de manos.
        </div>
        <PuntosMatriz
          tipo="HM"
          lista={visita.puntosHM}
          chk={CHK_HM}
          placeholder="Punto de atención (ej.: lavamanos consultorio 1)"
        />
        {rh.eval ? <ResumenPuntos resumen={rh} chk={CHK_HM} /> : null}
      </Card>

      <Card>
        <h2>Verificación de rotulación por área</h2>
        <div className="hint">
          Registre cada área con insumos, sustancias o muestras y verifique su rotulación. Sustenta el bloque de
          rotulación y trazabilidad.
        </div>
        <PuntosMatriz
          tipo="RT"
          lista={visita.puntosRT}
          chk={CHK_RT}
          placeholder="Área o punto (ej.: nevera de laboratorio)"
        />
        {rr.eval ? <ResumenPuntos resumen={rr} chk={CHK_RT} /> : null}
      </Card>
    </>
  );
}
