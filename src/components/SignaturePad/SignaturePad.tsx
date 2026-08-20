import { useEffect, useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

interface SignaturePadProps {
  value: string;
  onChange: (dataUrl: string) => void;
}

export function SignaturePad({ value, onChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const dirty = useRef(Boolean(value));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#102033';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (value) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      img.src = value;
    }
    // Solo inicializa el lienzo al montar el modal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const punto = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const exportar = () => {
    const canvas = canvasRef.current;
    if (!canvas || !dirty.current) return;
    onChange(canvas.toDataURL('image/png'));
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="firma-pad"
        width={420}
        height={150}
        onPointerDown={(event) => {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext('2d');
          if (!canvas || !ctx) return;
          drawing.current = true;
          dirty.current = true;
          canvas.setPointerCapture(event.pointerId);
          const { x, y } = punto(event);
          ctx.beginPath();
          ctx.moveTo(x, y);
        }}
        onPointerMove={(event) => {
          if (!drawing.current) return;
          const ctx = canvasRef.current?.getContext('2d');
          if (!ctx) return;
          const { x, y } = punto(event);
          ctx.lineTo(x, y);
          ctx.stroke();
        }}
        onPointerUp={() => {
          drawing.current = false;
          exportar();
        }}
        onPointerCancel={() => {
          drawing.current = false;
        }}
      />
      <button
        type="button"
        className="btn quiet sm"
        style={{ marginTop: 6 }}
        onClick={() => {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext('2d');
          if (!canvas || !ctx) return;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          dirty.current = false;
          onChange('');
        }}
      >
        Limpiar firma
      </button>
    </div>
  );
}
