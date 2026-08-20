export function hoy(): string {
  return new Date().toISOString().slice(0, 10);
}

export function periodo(fecha: string | undefined): string {
  return (fecha || '').slice(0, 7);
}

export function fmtF(fecha?: string | null): string {
  return fecha ? fecha.split('-').reverse().join('/') : '—';
}

export function pct(valor: number | null | undefined): string {
  if (valor == null) return '—';
  return `${(valor * 100).toFixed(1).replace('.', ',')} %`;
}

export function esc(valor: unknown): string {
  return String(valor == null ? '' : valor).replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return map[char] ?? char;
  });
}

export function nextPrefixedId(seq: number, prefix: string): { seq: number; id: string } {
  const next = (seq || 0) + 1;
  return { seq: next, id: `${prefix}-${String(next).padStart(3, '0')}` };
}
