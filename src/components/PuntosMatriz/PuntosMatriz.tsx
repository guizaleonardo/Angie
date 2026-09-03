import { useEffect, useState } from 'react';
import { useAmbulatoria } from '../../context/AmbulatoriaContext';
import type { PuntoVerificado, TickValor } from '../../types/ambulatoria';
import { puntoConforme, puntoEvaluado } from '../../utils/ambulatoria';
import { Pill } from '../Pill/Pill';

interface PuntosMatrizProps {
  tipo: 'HM' | 'RT';
  lista: PuntoVerificado[];
  chk: readonly string[];
  placeholder: string;
}

function tickClass(valor: TickValor): string {
  if (valor === true) return 'si';
  if (valor === false) return 'no';
  if (valor === 'NA') return 'na';
  return '';
}

function tickLabel(valor: TickValor): string {
  if (valor === true) return '✓';
  if (valor === false) return '✗';
  if (valor === 'NA') return 'NA';
  return '·';
}

function NombrePunto({
  value,
  placeholder,
  onCommit,
}: {
  value: string;
  placeholder: string;
  onCommit: (value: string) => void;
}) {
  const [text, setText] = useState(value);
  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <input
      value={text}
      placeholder={placeholder}
      onChange={(event) => setText(event.target.value)}
      onBlur={() => {
        if (text !== value) onCommit(text);
      }}
    />
  );
}

export function PuntosMatriz({ tipo, lista, chk, placeholder }: PuntosMatrizProps) {
  const { addPunto, delPunto, setPuntoNombre, tickPunto } = useAmbulatoria();

  return (
    <>
      <div className="tbl-scroll">
        <table className="mtx">
          <thead>
            <tr>
              <th>Punto</th>
              {chk.map((col) => (
                <th key={col}>{col}</th>
              ))}
              <th>Estado</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {lista.map((punto, idx) => {
              const vals = chk.map((_, i) => punto.c[i] ?? null);
              const evaluado = puntoEvaluado(vals);
              const ok = puntoConforme(vals);
              return (
                <tr key={`${tipo}-${idx}`}>
                  <td>
                    <NombrePunto
                      value={punto.n}
                      placeholder={placeholder}
                      onCommit={(nombre) => setPuntoNombre(tipo, idx, nombre)}
                    />
                  </td>
                  {chk.map((col, i) => (
                    <td key={col}>
                      <button
                        type="button"
                        className={`tick ${tickClass(punto.c[i] ?? null)}`}
                        title="Toque para alternar: sí / no / no aplica"
                        onClick={() => tickPunto(tipo, idx, i)}
                      >
                        {tickLabel(punto.c[i] ?? null)}
                      </button>
                    </td>
                  ))}
                  <td>
                    {evaluado ? (
                      <Pill className={ok ? 'p-si' : 'p-no'}>{ok ? 'Conforme' : 'No conforme'}</Pill>
                    ) : (
                      <Pill className="p-na">Pendiente</Pill>
                    )}
                  </td>
                  <td>
                    <button type="button" className="btn danger sm" onClick={() => delPunto(tipo, idx)}>
                      ×
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="row" style={{ marginTop: 10 }}>
        <button type="button" className="btn ghost sm" onClick={() => addPunto(tipo)}>
          Agregar punto
        </button>
      </div>
    </>
  );
}
