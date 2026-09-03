import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import { DebouncedField } from '../../components/DebouncedField/DebouncedField';
import { KPI } from '../../components/KPI/KPI';
import { Pill } from '../../components/Pill/Pill';
import { useAmbulatoria } from '../../context/AmbulatoriaContext';
import { useToast } from '../../context/ToastContext';
import { AMB_BLOQUES_SERVICIO, itemsDeArea, itemsTransversales } from '../../data/ambulatoria';
import { exportRespaldoAmb } from '../../services/ambulatoriaExport';
import { abrirInstrumentoBlanco } from '../../services/ambulatoriaInforme';
import type { VisitaCampo } from '../../types/ambulatoria';
import { cuentaGlobal } from '../../utils/ambulatoria';
import { nivel } from '../../utils/calculations';
import { pct } from '../../utils/format';

export function AmbVisita() {
  const { visita, setCampo, toggleArea, reiniciar } = useAmbulatoria();
  const { toast } = useToast();
  const navigate = useNavigate();
  const g = cuentaGlobal(visita);
  const n = nivel(g.pct);
  const itemsModulos = visita.areas.reduce((sum, area) => sum + itemsDeArea(area).length, 0);
  const itemsTx = itemsTransversales().length;

  const onCampo = (campo: VisitaCampo) => (valor: string) => setCampo(campo, valor);

  const onBlanco = () => {
    if (!abrirInstrumentoBlanco(visita)) {
      toast('El navegador bloqueó la ventana. Permita las ventanas emergentes.');
    }
  };

  const onRespaldo = () => {
    exportRespaldoAmb(visita);
    toast('Archivo descargado');
  };

  const onNueva = () => {
    if (reiniciar()) navigate('/ambulatoria');
  };

  return (
    <>
      <Card>
        <h2>Identificación de la visita</h2>
        <div className="hint">Estos datos encabezan el informe general.</div>
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
        <div className="aviso">
          Instrumento configurado para sede <b>ambulatoria</b>: no incluye urgencias, hospitalización, UCI ni cirugía.
          Sin camas ni usuarios hospitalizados: solo consulta y procedimientos ambulatorios. La identificación se verifica
          de forma documental en admisión y en cada punto de contacto — no se usa manilla.
        </div>
        <div className="chips">
          {AMB_BLOQUES_SERVICIO.map((area) => (
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
    </>
  );
}
