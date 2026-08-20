export function toCsv(filas: unknown[][]): string {
  const cell = (value: unknown) =>
    `"${String(value == null ? '' : value).replace(/"/g, '""')}"`;
  return `\uFEFF${filas.map((fila) => fila.map(cell).join(';')).join('\r\n')}`;
}

export function downloadFile(nombre: string, contenido: string, tipo: string): void {
  const blob = new Blob([contenido], { type: tipo });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = nombre;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 1500);
}
