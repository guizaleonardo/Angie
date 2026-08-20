import { useState } from 'react';
import type { FirmasActa } from '../../types';
import { SignaturePad } from '../SignaturePad/SignaturePad';

interface FirmaActaModalProps {
  liderSugerido?: string;
  onCancel: () => void;
  onConfirm: (firmas: FirmasActa) => void;
}

export function FirmaActaModal({ liderSugerido = '', onCancel, onConfirm }: FirmaActaModalProps) {
  const [seguridadNombre, setSeguridadNombre] = useState(liderSugerido);
  const [coordinadorNombre, setCoordinadorNombre] = useState('');
  const [seguridadImagen, setSeguridadImagen] = useState('');
  const [coordinadorImagen, setCoordinadorImagen] = useState('');

  const listo =
    seguridadNombre.trim() &&
    coordinadorNombre.trim() &&
    seguridadImagen &&
    coordinadorImagen;

  return (
    <div className="modal-back noimp" role="dialog" aria-modal="true" aria-labelledby="firmas-titulo">
      <div className="modal">
        <h2 id="firmas-titulo">Firmas del acta</h2>
        <div className="hint">
          Antes de generar el documento deben firmar el líder de seguridad del paciente y el líder o coordinador del servicio.
        </div>
        <div className="grid g2" style={{ marginTop: 12 }}>
          <div>
            <label htmlFor="firma-seguridad-nombre">Líder de seguridad del paciente</label>
            <input
              id="firma-seguridad-nombre"
              value={seguridadNombre}
              placeholder="Nombre y cargo"
              onChange={(event) => setSeguridadNombre(event.target.value)}
            />
            <label style={{ marginTop: 10 }}>Firma manuscrita</label>
            <SignaturePad value={seguridadImagen} onChange={setSeguridadImagen} />
          </div>
          <div>
            <label htmlFor="firma-coord-nombre">Líder o coordinador del servicio</label>
            <input
              id="firma-coord-nombre"
              value={coordinadorNombre}
              placeholder="Nombre y cargo"
              onChange={(event) => setCoordinadorNombre(event.target.value)}
            />
            <label style={{ marginTop: 10 }}>Firma manuscrita</label>
            <SignaturePad value={coordinadorImagen} onChange={setCoordinadorImagen} />
          </div>
        </div>
        {!listo ? (
          <div className="aviso" style={{ marginTop: 14 }}>
            Complete nombre y firma de ambas personas para continuar.
          </div>
        ) : null}
        <div className="row" style={{ marginTop: 14 }}>
          <button type="button" className="btn quiet" onClick={onCancel}>Cancelar</button>
          <button
            type="button"
            className="btn"
            disabled={!listo}
            onClick={() =>
              onConfirm({
                seguridad: { nombre: seguridadNombre.trim(), imagen: seguridadImagen },
                coordinador: { nombre: coordinadorNombre.trim(), imagen: coordinadorImagen },
              })
            }
          >
            Generar acta
          </button>
        </div>
      </div>
    </div>
  );
}
