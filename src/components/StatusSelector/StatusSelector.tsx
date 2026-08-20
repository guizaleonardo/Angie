import type { ResultadoEstado } from '../../types';
import { RESULTADOS } from '../../types';

interface StatusSelectorProps {
  value?: ResultadoEstado;
  onChange: (estado: ResultadoEstado) => void;
}

export function StatusSelector({ value, onChange }: StatusSelectorProps) {
  return (
    <div className="sel">
      {RESULTADOS.map((opcion) => (
        <button
          key={opcion}
          type="button"
          data-v={opcion}
          className={value === opcion ? 'on' : ''}
          aria-pressed={value === opcion}
          onClick={() => onChange(opcion)}
        >
          {opcion}
        </button>
      ))}
    </div>
  );
}
