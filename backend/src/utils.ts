export function hoy(): string {
  return new Date().toISOString().slice(0, 10);
}

export function periodo(fecha: string | undefined): string {
  return (fecha || '').slice(0, 7);
}

export function nextPrefixedId(seq: number, prefix: string): { seq: number; id: string } {
  const next = (seq || 0) + 1;
  return { seq: next, id: `${prefix}-${String(next).padStart(3, '0')}` };
}

export function sumarDias(fecha: string | undefined, dias: number): string {
  if (!fecha) return '';
  const x = new Date(`${fecha}T00:00:00`);
  x.setDate(x.getDate() + dias);
  return x.toISOString().slice(0, 10);
}

export function toCsv(filas: unknown[][]): string {
  const cell = (value: unknown) => `"${String(value == null ? '' : value).replace(/"/g, '""')}"`;
  return `\uFEFF${filas.map((fila) => fila.map(cell).join(';')).join('\r\n')}`;
}

export function pctNumber(valor: number | null | undefined): string {
  if (valor == null) return '';
  return (valor * 100).toFixed(1).replace('.', ',');
}
