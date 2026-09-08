import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import { DebouncedField } from '../../components/DebouncedField/DebouncedField';
import { KPI } from '../../components/KPI/KPI';
import { Pill } from '../../components/Pill/Pill';
import { useVisita } from '../../context/AmbulatoriaContext';
import { useToast } from '../../context/ToastContext';
import { exportRespaldoAmb } from '../../services/ambulatoriaExport';
import { abrirInstrumentoBlanco } from '../../services/ambulatoriaInforme';
import type { VisitaCampo } from '../../types/ambulatoria';
import { cuentaGlobal } from '../../utils/ambulatoria';
import { nivel } from '../../utils/calculations';
import { fmtF, pct } from '../../utils/format';
import { pathOf } from '../../visita/config';

export function AmbVisita() {
  const { visita, historial, config, setCampo, toggleArea, toggleBloque, setBloques, nuevaVisita, abrirVisita } =
    useVisita();
  const { toast } = useToast();
  const navigate = useNavigate();
  const g = cuentaGlobal(visita, config);
  const n = nivel(g.pct);
  const itemsModulos = visita.areas.reduce((sum, area) => sum + config.itemsDeArea(area).length, 0);
  const itemsTx = config.itemsTransversales(visita).length;
  const bloquesActivos = visita.bloques.length ? visita.bloques : config.ordenBloques;

  const onCampo = (campo: VisitaCampo) => (valor: string) => setCampo(campo, valor);

  const onBlanco = () => {
    if (!abrirInstrumentoBlanco(visita, config)) {
      toast('El navegador bloqueó la ventana. Permita las ventanas emergentes.');
    }
  };

  const onRespaldo = () => {
    exportRespaldoAmb(visita);
    toast('Archivo descargado');
  };

  const onNueva = async () => {
    if (await nuevaVisita()) navigate(pathOf(config));
  };

  return (
    <>
      <Card>
        <h2>Identificación de la visita</h2>
        <div className="hint">
          Estos datos encabezan el informe general. Visita actual: <span className="mono">{visita.id}</span>
        </div>
        <div className="grid g2">
          <DebouncedField label="Sede" value={visita.sede} onCommit={onCampo('sede')} />
          <DebouncedField label="Municipio" value={visita.municipio} onCommit={onCampo('municipio')} />
          <DebouncedField label="Fecha de la visita" type="date" value={visita.fecha} onCommit={onCampo('fecha')} />
          <DebouncedField
            label="Auditor / líder de la ronda"
            value={visita.auditor}
            placeholder="Nombre y cargo"
            onCommit={onCampo('auditor')}
          />
          <DebouncedField
            label="Acompañantes por parte de la sede"
            value={visita.acompanantes}
            span
            onCommit={onCampo('acompanantes')}
          />
          <DebouncedField
            label="Alcance declarado de la ronda"
            value={visita.alcance}
            multiline
            span
            placeholder="Qué se verificó y con qué criterio."
            onCommit={onCampo('alcance')}
          />
        </div>
      </Card>

      <Card>
        <h2>Áreas presentes en la sede</h2>
        <div className="hint">
          Marque solo las que existen aquí. Los bloques transversales (prácticas seguras, IAAS, medicamentos, rotulación)
          se verifican una vez para toda la sede; cada área marcada suma su módulo específico.
        </div>
        <div className="aviso">{config.avisoAreas}</div>
        <div className="chips">
          {config.bloquesServicio.map((area) => (
            <button
              key={area.codigo}
              type="button"
              className={`chip ${visita.areas.includes(area.codigo) ? 'on' : ''}`}
              onClick={() => toggleArea(area.codigo)}
            >
              {area.nombre}
            </button>
          ))}
        </div>
        {config.allowToggleBloques ? (
          <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--linea)' }}>
            <b style={{ fontSize: 13 }}>Bloques transversales a verificar</b>
            <div className="hint" style={{ margin: '4px 0 10px' }}>
              Se evalúan una sola vez para la sede. Desmarque para acortar la ronda.
            </div>
            <div className="chips">
              {config.bloquesTransversales.map((bloque) => {
                const nItems = config.itemsTransversales({ ...visita, bloques: [bloque.codigo] }).length;
                return (
                  <button
                    key={bloque.codigo}
                    type="button"
                    className={`chip ${bloquesActivos.includes(bloque.codigo) ? 'on' : ''}`}
                    onClick={() => toggleBloque(bloque.codigo)}
                  >
                    {bloque.nombre}{' '}
                    <span className="mono" style={{ opacity: 0.7, fontSize: 11 }}>
                      {nItems}
                    </span>
                  </button>
                );
              })}
            </div>
            {config.presets.length ? (
              <div className="row" style={{ marginTop: 10 }}>
                {config.presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    className="btn quiet sm"
                    onClick={() => setBloques(preset.bloques)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
        {visita.areas.length ? (
          <div className="row" style={{ marginTop: 14 }}>
            <Pill className="p-mk">{itemsTx} ítems transversales</Pill>
            <Pill className="p-mk">{itemsModulos} ítems de módulos</Pill>
            <Pill className="p-na">{itemsTx + itemsModulos} ítems en total</Pill>
          </div>
        ) : (
          <div className="aviso" style={{ marginTop: 14 }}>
            Seleccione al menos un área para habilitar la verificación por módulos.
          </div>
        )}
      </Card>

      <Card>
        <h2>Avance</h2>
        <div className="grid g4">
          <KPI value={pct(g.pct)} label="Cumplimiento de la sede" variant="acento" />
          <KPI value={g.den + g.NA} label="Ítems verificados" />
          <KPI value={g.NC} label="No conformidades" />
          <KPI value={visita.hallazgos.length} label="Planes formulados" />
        </div>
        <div className="row" style={{ marginTop: 12 }}>
          <Pill className={n.c}>{n.t}</Pill>
          <div className="spacer" />
          <button type="button" className="btn ghost sm" onClick={onBlanco}>
            Imprimir instrumento en blanco
          </button>
          <button type="button" className="btn ghost sm" onClick={onRespaldo}>
            Descargar respaldo
          </button>
          <button type="button" className="btn quiet sm" onClick={onNueva}>
            Nueva visita
          </button>
        </div>
      </Card>

      <Card>
        <h2>Historial de visitas</h2>
        <div className="hint">
          Cada visita queda guardada. Use Nueva visita para empezar otra; las anteriores no se borran.
        </div>
        {!historial.length ? (
          <div className="meta">Aún no hay visitas registradas en el servidor.</div>
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Auditor</th>
                  <th>Cumplimiento</th>
                  <th>Planes</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {historial.map((item) => {
                  const actual = item.id === visita.id;
                  return (
                    <tr key={item.id} className={actual ? 'is-me' : ''}>
                      <td className="mono">{item.id}</td>
                      <td>{fmtF(item.fecha)}</td>
                      <td>{item.auditor || '—'}</td>
                      <td>{pct(item.pct ?? null)}</td>
                      <td>{item.hallazgos}</td>
                      <td>
                        {actual ? (
                          <Pill className="p-mk">Abierta</Pill>
                        ) : (
                          <button type="button" className="btn ghost sm" onClick={() => abrirVisita(item.id)}>
                            Abrir
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}
