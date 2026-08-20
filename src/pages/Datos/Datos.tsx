import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Card } from '../../components/Card/Card';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { abrirActa } from '../../services/acta';
import { exportCsvDetalle, exportCsvHallazgos, exportCsvRondas } from '../../services/export';
import { downloadFile } from '../../utils/csv';
import { fmtF, hoy } from '../../utils/format';

export function Datos() {
  const { data, backupJSON, restoreFromJSON, borrarTodo } = useApp();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [actaId, setActaId] = useState(data.rondas[0]?.id ?? '');

  useEffect(() => {
    if (!data.rondas.some((ronda) => ronda.id === actaId)) {
      setActaId(data.rondas[0]?.id ?? '');
    }
  }, [data.rondas, actaId]);

  const descargar = (fn: () => void) => {
    fn();
    toast('Archivo descargado');
  };

  const onBackup = () => {
    downloadFile(`respaldo_rondas_${hoy()}.json`, backupJSON(), 'application/json');
    toast('Archivo descargado');
  };

  const onRestore = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const ok = restoreFromJSON(String(reader.result));
        if (ok) toast('Respaldo restaurado');
      } catch {
        toast('El archivo no es un respaldo válido de esta herramienta');
      }
    };
    reader.readAsText(file);
  };

  const onActa = () => {
    const ronda = data.rondas.find((r) => r.id === actaId) || data.rondas[0];
    if (!ronda) return;
    if (!abrirActa(ronda, data.hallazgos)) {
      toast('El navegador bloqueó la ventana. Permita las ventanas emergentes.');
    }
  };

  return (
    <Card>
      <h2>Exportar y respaldar</h2>
      <div className="hint">Los datos viven en este navegador. Exporte con regularidad y guarde el respaldo donde corresponda.</div>
      <div className="grid g2">
        <div>
          <b>Consolidado de rondas</b>
          <div className="meta" style={{ fontSize: 12, color: 'var(--tinta3)', margin: '4px 0 8px' }}>
            Una fila por ronda con conteos y porcentaje. Para el informe del Comité.
          </div>
          <button type="button" className="btn ghost sm" onClick={() => descargar(() => exportCsvRondas(data.rondas))}>
            Descargar CSV
          </button>
        </div>
        <div>
          <b>Detalle ítem por ítem</b>
          <div className="meta" style={{ fontSize: 12, color: 'var(--tinta3)', margin: '4px 0 8px' }}>
            Cada ítem verificado con su resultado y observación. Es la evidencia de la auditoría.
          </div>
          <button type="button" className="btn ghost sm" onClick={() => descargar(() => exportCsvDetalle(data.rondas))}>
            Descargar CSV
          </button>
        </div>
        <div>
          <b>Planes de mejoramiento</b>
          <div className="meta" style={{ fontSize: 12, color: 'var(--tinta3)', margin: '4px 0 8px' }}>
            Los 5W1H completos con responsable, fecha y estado.
          </div>
          <button type="button" className="btn ghost sm" onClick={() => descargar(() => exportCsvHallazgos(data))}>
            Descargar CSV
          </button>
        </div>
        <div>
          <b>Respaldo completo</b>
          <div className="meta" style={{ fontSize: 12, color: 'var(--tinta3)', margin: '4px 0 8px' }}>
            Archivo JSON con todo. Sirve para restaurar en otro equipo.
          </div>
          <button type="button" className="btn ghost sm" onClick={onBackup}>Descargar respaldo</button>
          <button type="button" className="btn quiet sm" onClick={() => fileRef.current?.click()}>Restaurar</button>
          <input ref={fileRef} type="file" accept=".json" className="hide" onChange={onRestore} />
        </div>
      </div>

      <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--linea)' }}>
        <b>Actas e informes</b>
        <div className="meta" style={{ fontSize: 12, color: 'var(--tinta3)', margin: '4px 0 8px' }}>
          Genera una versión imprimible (o PDF con &quot;Guardar como PDF&quot;) de una ronda concreta.
        </div>
        <div className="row">
          <select
            value={actaId}
            onChange={(e) => setActaId(e.target.value)}
            style={{ maxWidth: 340 }}
          >
            {data.rondas.length
              ? data.rondas.map((ronda) => (
                  <option key={ronda.id} value={ronda.id}>
                    {ronda.id} · {ronda.servicio} · {fmtF(ronda.fecha)}
                  </option>
                ))
              : <option>Sin rondas</option>}
          </select>
          <button type="button" className="btn" disabled={!data.rondas.length} onClick={onActa}>
            Generar acta
          </button>
        </div>
      </div>

      <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--linea)' }}>
        <b>Borrar todo</b>
        <div className="meta" style={{ fontSize: 12, color: 'var(--tinta3)', margin: '4px 0 8px' }}>
          Elimina rondas, resultados y planes de este navegador. No se puede deshacer.
        </div>
        <button type="button" className="btn danger sm" onClick={() => borrarTodo()}>
          Borrar todos los datos
        </button>
      </div>
    </Card>
  );
}
