import { itemsDeServicio } from '../data/rondas';
import type { Hallazgo, Ronda } from '../types';
import { conteo, nivel } from '../utils/calculations';
import { esc, fmtF, pct } from '../utils/format';
import { filasBloqueActa } from './export';

export function abrirActa(ronda: Ronda, hallazgos: Hallazgo[]): boolean {
  const c = conteo(ronda);
  const nv = nivel(c.pct);
  const hs = hallazgos.filter((h) => h.rondaId === ronda.id);
  const filas = filasBloqueActa(ronda);
  const ncs: Array<[string, string, string]> = [];
  itemsDeServicio(ronda.servicioCod).forEach((item) => {
    const valor = ronda.resultados[item.id];
    if (valor?.r === 'NC') ncs.push([item.id, item.item, valor.obs || '']);
  });

  const popup = window.open('', '_blank');
  if (!popup) return false;

  popup.document.write(`<!doctype html><meta charset="utf-8"><title>Acta ronda ${esc(ronda.id)}</title>
  <style>body{font-family:"IBM Plex Sans",Arial,sans-serif;color:#102033;max-width:820px;margin:34px auto;padding:0 22px;font-size:13px;line-height:1.5}
  h1{font-size:17px;margin:0 0 2px}h2{font-size:13px;margin:22px 0 7px;border-bottom:2px solid #0E4A7A;padding-bottom:4px;color:#0E4A7A;text-transform:uppercase;letter-spacing:.05em}
  .sub{color:#666;font-size:11.5px;margin-bottom:16px}
  table{width:100%;border-collapse:collapse;font-size:12px;margin-top:6px}
  th{background:#E4EEF6;text-align:left;padding:6px 7px;border:1px solid #C3CDD6;font-size:11px;text-transform:uppercase;letter-spacing:.04em}
  td{padding:6px 7px;border:1px solid #DCE3EA;vertical-align:top}
  .kv{display:grid;grid-template-columns:170px 1fr;gap:3px 10px;font-size:12.5px}
  .kv b{color:#4A5A6A;font-weight:600}
  .firma{margin-top:44px;display:grid;grid-template-columns:1fr 1fr;gap:44px}
  .firma div{border-top:1px solid #102033;padding-top:5px;font-size:11.5px;text-align:center}
  @media print{body{margin:0}}</style>
  <h1>Acta de ronda de seguridad del paciente</h1>
  <div class="sub">Guía Técnica de Buenas Prácticas para la Seguridad del Paciente (MinSalud) · Resolución 3100 de 2019</div>
  <div class="kv">
    <b>Identificación de la ronda</b><span>${esc(ronda.id)}</span>
    <b>Servicio auditado</b><span>${esc(ronda.servicio)}</span>
    <b>Fecha</b><span>${fmtF(ronda.fecha)}</span>
    <b>Líder de la ronda</b><span>${esc(ronda.lider) || '—'}</span>
    <b>Acompañantes</b><span>${esc(ronda.acompanantes) || '—'}</span>
    <b>Ítems verificados</b><span>${c.den} de ${c.total} (${c.NA} no aplicables)</span>
    <b>Cumplimiento</b><span><b>${c.pct == null ? '—' : pct(c.pct)}</b> — ${esc(nv.t)}</span>
  </div>
  <h2>Resultado por bloque</h2>
  <table><thead><tr><th>Bloque</th><th>C</th><th>NC</th><th>NA</th><th>% Cumplimiento</th></tr></thead><tbody>
  ${filas.map((f) => `<tr><td>${esc(f[0])}</td><td>${f[1]}</td><td>${f[2]}</td><td>${f[3]}</td><td>${esc(f[4])}</td></tr>`).join('')}</tbody></table>
  <h2>No conformidades identificadas (${ncs.length})</h2>
  ${ncs.length ? `<table><thead><tr><th style="width:52px">Ítem</th><th>Descripción del ítem</th><th>Hallazgo</th></tr></thead><tbody>
    ${ncs.map((n) => `<tr><td>${esc(n[0])}</td><td>${esc(n[1])}</td><td>${esc(n[2]) || '—'}</td></tr>`).join('')}</tbody></table>`
    : '<p>No se identificaron no conformidades en esta ronda.</p>'}
  <h2>Plan de mejoramiento 5W1H (${hs.length})</h2>
  ${hs.length ? hs.map((x) => `<table style="margin-bottom:12px"><tbody>
      <tr><th style="width:120px">Plan</th><td>${esc(x.id)} · Ítem ${esc(x.itemId)} · Criticidad ${esc(x.criticidad)} · ${esc(x.estado)}${x.sugerido ? ' <b style="color:#B3261E">— PROPUESTA SIN VALIDAR</b>' : ''}</td></tr>
      <tr><th>Hallazgo</th><td>${esc(x.desc) || '—'}</td></tr>
      <tr><th>¿Qué?</th><td>${esc(x.que) || '—'}</td></tr>
      <tr><th>¿Por qué?</th><td>${esc(x.porque) || '—'}</td></tr>
      <tr><th>¿Dónde?</th><td>${esc(x.donde) || '—'}</td></tr>
      <tr><th>¿Quién?</th><td>${esc(x.quien) || '—'}</td></tr>
      <tr><th>¿Cuándo?</th><td>${fmtF(x.cuando)}</td></tr>
      <tr><th>¿Cómo?</th><td>${esc(x.como) || '—'}</td></tr>
    </tbody></table>`).join('') : '<p>Sin planes registrados para esta ronda.</p>'}
  <h2>Observación general</h2><p>${esc(ronda.obs) || '—'}</p>
  <div class="firma"><div>Líder de seguridad del paciente</div><div>Líder o coordinador del servicio</div></div>
  <script>window.onload=function(){window.print()}<\/script>`);
  popup.document.close();
  return true;
}
