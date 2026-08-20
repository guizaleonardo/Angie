import { useState, type ReactNode } from 'react';
import { useToast } from '../../context/ToastContext';
import { abrirActa } from '../../services/acta';
import type { Hallazgo, Ronda } from '../../types';
import { FirmaActaModal } from '../FirmaActaModal/FirmaActaModal';

interface GenerarActaButtonProps {
  ronda: Ronda | undefined;
  hallazgos: Hallazgo[];
  className?: string;
  disabled?: boolean;
  children: ReactNode;
}

export function GenerarActaButton({
  ronda,
  hallazgos,
  className = 'btn',
  disabled,
  children,
}: GenerarActaButtonProps) {
  const { toast } = useToast();
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <button
        type="button"
        className={className}
        disabled={disabled || !ronda}
        onClick={() => setAbierto(true)}
      >
        {children}
      </button>
      {abierto && ronda ? (
        <FirmaActaModal
          liderSugerido={ronda.lider}
          onCancel={() => setAbierto(false)}
          onConfirm={(firmas) => {
            setAbierto(false);
            if (!abrirActa(ronda, hallazgos, firmas)) {
              toast('El navegador bloqueó la ventana. Permita las ventanas emergentes.');
            }
          }}
        />
      ) : null}
    </>
  );
}
