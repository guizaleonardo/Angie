import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from '../../components/Bar/Bar';
import { Card } from '../../components/Card/Card';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { KPI } from '../../components/KPI/KPI';
import { Pill } from '../../components/Pill/Pill';
import { TrendChart } from '../../components/TrendChart/TrendChart';
import { useApp } from '../../context/AppContext';
import { BLOQUES, BLOQUES_SERVICIO } from '../../data/rondas';
import {
  agregado,
  conteo,
  nivel,
  noConformidadesRepetidas,
  planesAbiertos,
  resultadosPorBloque,
  tendenciaPorPeriodo,
  vencido,
} from '../../utils/calculations';
import { pct } from '../../utils/format';

export function Dashboard() {
  const { data } = useApp();
  const navigate = useNavigate();

  const cerradas = useMemo(
    () => data.rondas.filter((ronda) => conteo(ronda).den > 0),
    [data.rondas],
  );

  const global = useMemo(() => agregado(data.rondas), [data.rondas]);
  const nv = nivel(global.pct);
  const venc = data.hallazgos.filter((h) => vencido(h)).length;
  const alta = data.hallazgos.filter((h) => h.criticidad === 'Alta' && h.estado !== 'Cerrado').length;

  const filasServicio = useMemo(() => {
    return BLOQUES_SERVICIO.map((servicio) => {
      const rs = data.rondas.filter((r) => r.servicioCod === servicio.codigo && conteo(r).den > 0);
      const a = agregado(data.rondas, (r) => r.servicioCod === servicio.codigo);
      const ha = data.hallazgos.filter((x) => x.servicioCod === servicio.codigo && x.estado !== 'Cerrado').length;
      return {
        cod: servicio.codigo,
        nom: servicio.nombre,
        rondas: rs.length,
        ...a,
        ha,
      };
    }).sort((a, b) => Number(a.pct == null) - Number(b.pct == null) || (a.pct ?? 0) - (b.pct ?? 0));
  }, [data.rondas, data.hallazgos]);

  const porBloque = useMemo(
    () => resultadosPorBloque(data.rondas, BLOQUES),
    [data.rondas],
  );

  const tendencia = useMemo(() => tendenciaPorPeriodo(data.rondas), [data.rondas]);
  const repetidas = useMemo(() => noConformidadesRepetidas(data.rondas), [data.rondas]);

  if (!cerradas.length) {
    return (
      <Card>
        <EmptyState title="Todavía no hay rondas con resultados">
          Cree la primera ronda y márquele resultados: el tablero se arma solo.
          <div style={{ marginTop: 14 }}>
            <button type="button" className="btn" onClick={() => navigate('/rondas')}>
              Crear la primera ronda
            </button>
          </div>
        </EmptyState>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <h2>Resumen</h2>
        <div className="hint">El porcentaje es C ÷ (C + NC). Los ítems marcados NA quedan fuera del denominador.</div>
        <div className="grid g4">
          <KPI value={pct(global.pct)} label="Cumplimiento global" variant="acento" />
          <KPI value={cerradas.length} label="Rondas con resultados" />
          <KPI value={global.C + global.NC} label="Ítems verificados" />
          <KPI value={global.NC} label="No conformidades" />
          <KPI value={planesAbiertos(data.hallazgos)} label="Planes abiertos" />
          <KPI value={venc} label="Planes vencidos" variant={venc ? 'riesgo' : ''} />
          <KPI value={alta} label="Criticidad alta abierta" variant={alta ? 'riesgo' : ''} />
          <KPI value={global.NA} label="Ítems no aplicables" />
        </div>
        <div className="row" style={{ marginTop: 12 }}>
          <Pill className={nv.c}>Nivel institucional: {nv.t}</Pill>
        </div>
      </Card>

      <Card>
        <h2>Cumplimiento por servicio</h2>
        <div className="hint">Ordenado de menor a mayor: lo primero de la lista es lo que necesita intervención.</div>
        <div className="tbl-scroll">
          <table>
            <thead>
              <tr>
                <th>Servicio</th>
                <th>Rondas</th>
                <th>C</th>
                <th>NC</th>
                <th>NA</th>
                <th style={{ width: 190 }}>Cumplimiento</th>
                <th>Nivel</th>
                <th>Planes abiertos</th>
              </tr>
            </thead>
            <tbody>
              {filasServicio.map((fila) => {
                const nivelFila = nivel(fila.pct);
                return (
                  <tr key={fila.cod}>
                    <td><b>{fila.nom}</b></td>
                    <td className="cifra">{fila.rondas}</td>
                    <td className="cifra">{fila.C}</td>
                    <td className="cifra">{fila.NC}</td>
                    <td className="cifra">{fila.NA}</td>
                    <td><Bar value={fila.pct} /></td>
                    <td><Pill className={nivelFila.c}>{nivelFila.t}</Pill></td>
                    <td className="cifra">{fila.ha || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2>Cumplimiento por bloque</h2>
        <div className="hint">Los bloques A–E son transversales; F–P corresponden al servicio auditado.</div>
        <div className="tbl-scroll">
          <table>
            <thead>
              <tr>
                <th>Bloque</th>
                <th>C</th>
                <th>NC</th>
                <th>NA</th>
                <th style={{ width: 190 }}>Cumplimiento</th>
              </tr>
            </thead>
            <tbody>
              {porBloque.map((bloque) => (
                <tr key={bloque.cod}>
                  <td>
                    <span className="mono" style={{ color: 'var(--marca)', fontWeight: 600 }}>{bloque.cod}</span>{' '}
                    {bloque.nom}
                  </td>
                  <td className="cifra">{bloque.C}</td>
                  <td className="cifra">{bloque.NC}</td>
                  <td className="cifra">{bloque.NA}</td>
                  <td><Bar value={bloque.pct} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {tendencia.length ? (
        <Card>
          <h2>Tendencia por periodo</h2>
          <div className="hint">Cumplimiento consolidado de todas las rondas de cada mes.</div>
          <TrendChart points={tendencia} />
        </Card>
      ) : null}

      {repetidas.length ? (
        <Card>
          <h2>No conformidades más repetidas</h2>
          <div className="hint">Reincidencia entre rondas: son las causas que el plan de mejoramiento aún no ha resuelto.</div>
          <div className="tbl-scroll">
            <table>
              <thead>
                <tr>
                  <th style={{ width: 70 }}>Ítem</th>
                  <th>Descripción</th>
                  <th style={{ width: 80 }}>Veces</th>
                </tr>
              </thead>
              <tbody>
                {repetidas.map((fila) => (
                  <tr key={fila.id}>
                    <td>
                      <span className="mono" style={{ color: 'var(--marca)', fontWeight: 600 }}>{fila.id}</span>
                    </td>
                    <td>{fila.item}</td>
                    <td className="cifra">{fila.veces}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}
    </>
  );
}
