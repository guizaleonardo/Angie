import { useState } from 'react';
import { Bar } from '../../components/Bar/Bar';
import { Card } from '../../components/Card/Card';
import { DebouncedField } from '../../components/DebouncedField/DebouncedField';
import { FirmaActaModal } from '../../components/FirmaActaModal/FirmaActaModal';
import { KPI } from '../../components/KPI/KPI';
import { Pill } from '../../components/Pill/Pill';
import { useVisita } from '../../context/AmbulatoriaContext';
import { useToast } from '../../context/ToastContext';
import { CHK_HM, CHK_RT } from '../../data/ambulatoria';
import { exportCsvDetalleAmb, exportCsvPlanesAmb, exportRespaldoAmb } from '../../services/ambulatoriaExport';
import { abrirInformeAmb } from '../../services/ambulatoriaInforme';
import type { FirmasActa } from '../../types';
import { adherencia, bloquesResumen, cuentaGlobal, puntosResumen } from '../../utils/ambulatoria';
import { nivel } from '../../utils/calculations';
import { pct } from '../../utils/format';

export function AmbInforme() {
  const { visita, config, setCampo } = useVisita();
  const { toast } = useToast();
  const [firmasAbiertas, setFirmasAbiertas] = useState(false);
  const g = cuentaGlobal(visita, config);
  const n = nivel(g.pct);
  const rh = puntosResumen(visita.puntosHM, CHK_HM);
  const rr = puntosResumen(visita.puntosRT, CHK_RT);
  const res = bloquesResumen(visita, config);
  const altas = visita.hallazgos.filter((x) => x.criticidad === 'Alta').length;

  const avisoPopup = () => toast('El navegador bloqueó la ventana. Permita las ventanas emergentes.');

  const onInforme = () => setFirmasAbiertas(true);

  const onConfirmarFirmas = (firmas: FirmasActa) => {
    setFirmasAbiertas(false);
    if (!abrirInformeAmb(visita, firmas, config)) avisoPopup();
  };

  const onDetalle = () => {
    exportCsvDetalleAmb(visita, config);
    toast('Archivo descargado');
  };

  const onPlanes = () => {
    exportCsvPlanesAmb(visita, config);
    toast('Archivo descargado');
  };

  const onRespaldo = () => {
    exportRespaldoAmb(visita);
    toast('Archivo descargado');
  };

  return (
    <>
      <Card>
        <h2>Informe general de la visita</h2>
        <div className="hint">
          Consolida los bloques transversales, cada área, las matrices de puntos y los planes en un solo documento.
        </div>
        <div className="grid g4">
          <KPI value={pct(g.pct)} label="Cumplimiento de la sede" variant="acento" />
          <KPI value={visita.areas.length} label="Áreas verificadas" />
          <KPI value={g.NC} label="No conformidades" variant={g.NC ? 'riesgo' : ''} />
          <KPI value={pct(adherencia(visita.obsHM).pct)} label="Adherencia higiene de manos" />
          <KPI value={pct(rh.pct)} label="Puntos de higiene conformes" />
          <KPI value={pct(rr.pct)} label="Puntos de rotulación conformes" />
          <KPI value={altas} label="Planes de criticidad alta" />
        </div>
        <div className="row" style={{ marginTop: 12 }}>
          <Pill className={n.c}>{n.t}</Pill>
        </div>
        <div style={{ marginTop: 16 }}>
          <DebouncedField
            label="Conclusiones y compromisos de la visita"
            value={visita.concl}
            multiline
            placeholder="Conclusión general, compromisos acordados con la sede y fecha de reronda."
            onCommit={(valor) => setCampo('concl', valor)}
          />
        </div>
        <div className="row" style={{ marginTop: 14 }}>
          <button type="button" className="btn" onClick={onInforme}>
            Generar informe imprimible
          </button>
          <button type="button" className="btn ghost" onClick={onDetalle}>
            Detalle en CSV
          </button>
          <button type="button" className="btn ghost" onClick={onPlanes}>
            Planes en CSV
          </button>
          <button type="button" className="btn quiet" onClick={onRespaldo}>
            Respaldo
          </button>
        </div>
      </Card>
      {firmasAbiertas ? (
        <FirmaActaModal
          liderSugerido={visita.auditor}
          titulo="Firmas del informe"
          hint="Antes de generar el documento deben firmar el líder de seguridad del paciente y el responsable de la sede."
          labelSeguridad="Líder de seguridad del paciente"
          labelCoordinador="Responsable de la sede"
          confirmLabel="Generar informe"
          onCancel={() => setFirmasAbiertas(false)}
          onConfirm={onConfirmarFirmas}
        />
      ) : null}

      <Card>
        <h2>Vista previa por bloque y área</h2>
        <div className="tbl-scroll">
          <table>
            <thead>
              <tr>
                <th>Bloque / área</th>
                <th>Tipo</th>
                <th>C</th>
                <th>NC</th>
                <th>NA</th>
                <th style={{ width: 180 }}>Cumplimiento</th>
              </tr>
            </thead>
            <tbody>
              {res.map((r) => (
                <tr key={`${r.tipo}-${r.cod}`}>
                  <td>
                    <span className="mono" style={{ color: 'var(--marca)', fontWeight: 600 }}>
                      {r.cod}
                    </span>{' '}
                    {r.nom}
                  </td>
                  <td>
                    <Pill className={r.tipo === 'Transversal' ? 'p-mk' : 'p-na'}>{r.tipo}</Pill>
                  </td>
                  <td className="cifra">{r.C}</td>
                  <td className="cifra">{r.NC}</td>
                  <td className="cifra">{r.NA}</td>
                  <td>
                    <Bar value={r.pct} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
