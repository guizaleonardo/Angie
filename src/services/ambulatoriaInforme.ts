import { LOGO_SRC } from '../components/BrandLogo/BrandLogo';
import {
  AMB_NOMBRE_BLOQUE,
  CARGOS,
  CHK_HM,
  CHK_RT,
  MOMENTOS,
  itemsDeArea,
  itemsTransversales,
} from '../data/ambulatoria';
import type { VisitaAmb } from '../types/ambulatoria';
import { adherencia, bloquesResumen, cuentaGlobal, ncsVisita, puntosResumen } from '../utils/ambulatoria';
import { nivel } from '../utils/calculations';
import { esc, fmtF, pct } from '../utils/format';

function tabla(headers: string[], rows: string): string {
  return `<table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>`;
}

function celdaTick(valor: unknown): string {
  if (valor === true) return 'Sí';
  if (valor === false) return '<span class="alerta">No</span>';
  if (valor === 'NA') return 'NA';
  return '—';
}

export function abrirInformeAmb(visita: VisitaAmb): boolean {
  const g = cuentaGlobal(visita);
  const n = nivel(g.pct);
  const res = bloquesResumen(visita);
  const rh = puntosResumen(visita.puntosHM, CHK_HM);
  const rr = puntosResumen(visita.puntosRT, CHK_RT);
  const ncs = ncsVisita(visita);
  const orden: Record<string, number> = { Alta: 0, Media: 1, Baja: 2 };
  const planes = [...visita.hallazgos].sort((a, b) => (orden[a.criticidad] ?? 9) - (orden[b.criticidad] ?? 9));
  const adh = adherencia(visita.obsHM);

  const popup = window.open('', '_blank');
  if (!popup) return false;

  const logo = `${window.location.origin}${LOGO_SRC}`;

  const higieneHtml = !adh.n
    ? '<p>No se registraron observaciones de higiene de manos en esta visita.</p>'
    : `<p>Se observaron <b>${adh.n}</b> oportunidades de higiene de manos. Adherencia global: <b>${pct(adh.pct)}</b>
    (fricción con alcohol: ${adh.fr}; lavado con agua y jabón: ${adh.lm}; omisiones: <span class="alerta">${adh.om}</span>).
    ${adh.n < 20 ? '<b>Nota metodológica:</b> con menos de 20 oportunidades el resultado es indicativo y no representativo de la sede.' : ''}</p>
    ${tabla(
      ['Momento de la OMS', 'Oportunidades', 'Cumplidas', 'Omisiones', 'Adherencia'],
      MOMENTOS.map((m) => {
        const a = adherencia(visita.obsHM, (o) => o.momento === m[0]);
        return `<tr><td>${m[0]} · ${esc(m[1])}</td><td>${a.n}</td><td>${a.ok}</td><td>${a.om}</td><td>${a.n ? pct(a.pct) : '—'}</td></tr>`;
      }).join(''),
    )}
    ${tabla(
      ['Cargo observado', 'Oportunidades', 'Cumplidas', 'Omisiones', 'Adherencia'],
      CARGOS.map((c) => {
        const a = adherencia(visita.obsHM, (o) => o.cargo === c);
        if (!a.n) return '';
        return `<tr><td>${esc(c)}</td><td>${a.n}</td><td>${a.ok}</td><td>${a.om}</td><td>${pct(a.pct)}</td></tr>`;
      }).join(''),
    )}`;

  const puntosHMHtml = rh.eval
    ? `<p>Se verificaron <b>${rh.eval}</b> puntos de atención; <b>${rh.conf}</b> resultaron conformes (<b>${pct(rh.pct)}</b>). Un punto es conforme si no tiene ningún elemento en No.</p>
    ${tabla(
      ['Punto de atención', ...CHK_HM, 'Estado'],
      visita.puntosHM
        .filter((p) => p.c.some((x) => x != null))
        .map((p) => `<tr><td>${esc(p.n) || '—'}</td>
      ${p.c.map((x) => `<td>${celdaTick(x)}</td>`).join('')}
      <td>${p.c.every((x) => x === true || x === 'NA') ? 'Conforme' : '<span class="alerta">No conforme</span>'}</td></tr>`)
        .join(''),
    )}`
    : '<p>No se registraron puntos de atención en esta visita.</p>';

  const puntosRTHtml = rr.eval
    ? `<p>Se verificaron <b>${rr.eval}</b> áreas o puntos con insumos, sustancias o muestras; <b>${rr.conf}</b> resultaron conformes (<b>${pct(rr.pct)}</b>).</p>
    ${tabla(
      ['Área o punto', ...CHK_RT, 'Estado'],
      visita.puntosRT
        .filter((p) => p.c.some((x) => x != null))
        .map((p) => `<tr><td>${esc(p.n) || '—'}</td>
      ${p.c.map((x) => `<td>${celdaTick(x)}</td>`).join('')}
      <td>${p.c.every((x) => x === true || x === 'NA') ? 'Conforme' : '<span class="alerta">No conforme</span>'}</td></tr>`)
        .join(''),
    )}`
    : '<p>No se registraron puntos de rotulación en esta visita.</p>';

  popup.document.write(`<!doctype html><meta charset="utf-8"><title>Informe ronda de seguridad — ${esc(visita.sede)}</title>
  <style>body{font-family:"IBM Plex Sans",Arial,sans-serif;color:#12212F;max-width:840px;margin:34px auto;padding:0 24px;font-size:12.5px;line-height:1.5}
  h1{font-size:18px;margin:0 0 3px}
  h2{font-size:12.5px;margin:24px 0 8px;border-bottom:2px solid #1B4F8A;padding-bottom:4px;color:#1B4F8A;text-transform:uppercase;letter-spacing:.06em}
  .marca{font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:#1B4F8A;font-weight:700;margin-bottom:5px}
  .sub{color:#666;font-size:11px;margin-bottom:18px}
  .acta-cab{display:flex;align-items:center;gap:12px;margin-bottom:10px}
  .acta-cab img{height:46px;background:#fff;border:1px solid #DBE3EC;border-radius:6px;padding:4px 6px}
  table{width:100%;border-collapse:collapse;font-size:11.5px;margin-top:6px}
  th{background:#E4EDF8;text-align:left;padding:6px 7px;border:1px solid #C0CDDB;font-size:10.5px;text-transform:uppercase;letter-spacing:.04em}
  td{padding:6px 7px;border:1px solid #DBE3EC;vertical-align:top}
  .kv{display:grid;grid-template-columns:180px 1fr;gap:3px 10px}
  .kv b{color:#48596B;font-weight:600}
  .big{font-size:26px;font-weight:700;color:#1B4F8A;font-family:"IBM Plex Mono",monospace}
  .cajas{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:10px}
  .caja{border:1px solid #DBE3EC;border-radius:7px;padding:9px 11px}
  .caja .n{font-family:"IBM Plex Mono",monospace;font-size:19px;font-weight:700;color:#1B4F8A}
  .caja .l{font-size:9.5px;text-transform:uppercase;letter-spacing:.05em;color:#7A8B9C;margin-top:3px;font-weight:600}
  .alerta{color:#B3261E;font-weight:700}
  .firma{margin-top:46px;display:grid;grid-template-columns:1fr 1fr;gap:46px}
  .firma div{border-top:1px solid #12212F;padding-top:5px;font-size:11px;text-align:center}
  @media print{body{margin:0}h2{break-after:avoid}table{break-inside:auto}}</style>
  <div class="acta-cab"><img src="${esc(logo)}" alt="Clínica Piedecuesta S.A."><div>
  <div class="marca">Clínica Piedecuesta S.A.</div>
  <h1>Informe general de ronda de seguridad del paciente</h1></div></div>
  <div class="sub">${esc(visita.sede)} · ${esc(visita.municipio)} · ${fmtF(visita.fecha)}<br>
  Guía Técnica de Buenas Prácticas para la Seguridad del Paciente (MinSalud) · Resolución 3100 de 2019</div>

  <h2>1. Identificación</h2>
  <div class="kv">
    <b>Sede verificada</b><span>${esc(visita.sede)}</span>
    <b>Fecha de la visita</b><span>${fmtF(visita.fecha)}</span>
    <b>Auditor</b><span>${esc(visita.auditor) || '—'}</span>
    <b>Acompañantes</b><span>${esc(visita.acompanantes) || '—'}</span>
    <b>Áreas verificadas</b><span>${visita.areas.length ? visita.areas.map((a) => esc(AMB_NOMBRE_BLOQUE[a] || a)).join(' · ') : '—'}</span>
    <b>Alcance</b><span>${esc(visita.alcance) || 'Verificación de prácticas seguras transversales y módulos específicos de las áreas presentes en la sede.'}</span>
  </div>

  <h2>2. Resultado global</h2>
  <p>Cumplimiento de la sede: <span class="big">${g.pct == null ? '—' : pct(g.pct)}</span> — <b>${n.t}</b></p>
  <div class="cajas">
    <div class="caja"><div class="n">${g.den + g.NA}</div><div class="l">Ítems verificados</div></div>
    <div class="caja"><div class="n">${g.C}</div><div class="l">Cumple</div></div>
    <div class="caja"><div class="n">${g.NC}</div><div class="l">No cumple</div></div>
    <div class="caja"><div class="n">${g.NA}</div><div class="l">No aplica</div></div>
  </div>
  <p style="margin-top:10px;font-size:11px;color:#666">El porcentaje corresponde a C ÷ (C + NC). Los ítems no aplicables quedan fuera del denominador.</p>

  <h2>3. Resultado por bloque transversal y por área</h2>
  ${tabla(
    ['Bloque / área', 'Tipo', 'C', 'NC', 'NA', '% Cumplimiento', 'Nivel'],
    res
      .map(
        (r) => `<tr><td>${r.cod} · ${esc(r.nom)}</td><td>${r.tipo}</td><td>${r.C}</td><td>${r.NC}</td><td>${r.NA}</td>
      <td>${r.pct == null ? '—' : pct(r.pct)}</td><td>${nivel(r.pct).t}</td></tr>`,
      )
      .join(''),
  )}

  <h2>4. Adherencia a la higiene de manos (observación OMS)</h2>
  ${higieneHtml}

  <h2>5. Verificación de insumos de higiene de manos por punto</h2>
  ${puntosHMHtml}

  <h2>6. Verificación de rotulación y trazabilidad</h2>
  ${puntosRTHtml}

  <h2>7. No conformidades identificadas (${ncs.length})</h2>
  ${
    ncs.length
      ? tabla(
          ['Ítem', 'Área', 'Descripción del ítem', 'Hallazgo'],
          ncs
            .map((x) => `<tr><td>${x.item.id}</td><td>${esc(x.area)}</td><td>${esc(x.item.item)}</td><td>${esc(x.obs) || '—'}</td></tr>`)
            .join(''),
        )
      : '<p>No se identificaron no conformidades.</p>'
  }

  <h2>8. Plan de mejoramiento 5W1H (${planes.length})</h2>
  ${
    planes.length
      ? planes
          .map(
            (x) => `<table style="margin-bottom:11px"><tbody>
      <tr><th style="width:110px">Plan</th><td>${esc(x.id)} · Ítem ${esc(x.itemId)} · ${esc(x.area)} · Criticidad ${esc(x.criticidad)}${x.sugerido ? ' <span class="alerta">— PROPUESTA SIN VALIDAR</span>' : ''}</td></tr>
      <tr><th>Hallazgo</th><td>${esc(x.desc) || '—'}</td></tr>
      <tr><th>¿Qué?</th><td>${esc(x.que) || '—'}</td></tr>
      <tr><th>¿Por qué?</th><td>${esc(x.porque) || '—'}</td></tr>
      <tr><th>¿Dónde?</th><td>${esc(x.donde) || '—'}</td></tr>
      <tr><th>¿Quién?</th><td>${esc(x.quien) || '—'}</td></tr>
      <tr><th>¿Cuándo?</th><td>${fmtF(x.cuando)}</td></tr>
      <tr><th>¿Cómo?</th><td>${esc(x.como) || '—'}</td></tr></tbody></table>`,
          )
          .join('')
      : '<p>Sin planes formulados.</p>'
  }

  <h2>9. Conclusiones y compromisos</h2>
  <p>${esc(visita.concl) || '—'}</p>
  <div class="firma"><div>${esc(visita.auditor) || 'Líder de seguridad del paciente'}</div><div>Responsable de la sede</div></div>
  <script>window.onload=function(){window.print()}<\/script>`);
  popup.document.close();
  return true;
}

export function abrirInstrumentoBlanco(visita: VisitaAmb): boolean {
  const popup = window.open('', '_blank');
  if (!popup) return false;

  const grupos: Array<{ t: string; its: ReturnType<typeof itemsTransversales> }> = [];
  const bl = [...new Set(itemsTransversales().map((i) => i.bloque))];
  bl.forEach((b) =>
    grupos.push({
      t: `Transversal · ${b} — ${AMB_NOMBRE_BLOQUE[b] || b}`,
      its: itemsTransversales().filter((i) => i.bloque === b),
    }),
  );
  visita.areas.forEach((a) => grupos.push({ t: `Área · ${AMB_NOMBRE_BLOQUE[a] || a}`, its: itemsDeArea(a) }));

  const fila = (i: (typeof grupos)[number]['its'][number]) =>
    `<tr><td class="id">${i.id}</td><td>${esc(i.item)}<div class="fv">${esc(i.fuente)}</div></td>
    <td class="bx">&#9744;</td><td class="bx">&#9744;</td><td class="bx">&#9744;</td><td class="ob"></td></tr>`;

  const mtx = (tit: string, chk: readonly string[], ph: string) =>
    `<h2>${tit}</h2><table class="pt"><thead><tr><th style="width:200px">${ph}</th>
    ${chk.map((c) => `<th>${c}</th>`).join('')}<th>Conforme</th></tr></thead><tbody>
    ${Array.from({ length: 12 })
      .map(() => `<tr><td>&nbsp;</td>${chk.map(() => '<td class="bx">&#9744;</td>').join('')}<td class="bx">&#9744;</td></tr>`)
      .join('')}
    </tbody></table>`;

  popup.document.write(`<!doctype html><meta charset="utf-8"><title>Instrumento de ronda — ${esc(visita.sede)}</title>
  <style>body{font-family:"IBM Plex Sans",Arial,sans-serif;color:#12212F;max-width:900px;margin:24px auto;padding:0 20px;font-size:11px;line-height:1.4}
  h1{font-size:16px;margin:0 0 3px}
  h2{font-size:11px;margin:16px 0 5px;background:#E4EDF8;color:#1B4F8A;padding:5px 8px;border-left:3px solid #1B4F8A;text-transform:uppercase;letter-spacing:.05em}
  .marca{font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:#1B4F8A;font-weight:700}
  .sub{color:#666;font-size:10px;margin-bottom:12px}
  .kv{display:grid;grid-template-columns:repeat(2,1fr);gap:6px 16px;font-size:10.5px;margin-bottom:8px}
  .kv span{border-bottom:1px solid #12212F;padding-bottom:2px}
  table{width:100%;border-collapse:collapse;font-size:10px}
  th{background:#F0F4F9;text-align:left;padding:4px 5px;border:1px solid #C0CDDB;font-size:9px;text-transform:uppercase}
  td{padding:4px 5px;border:1px solid #DBE3EC;vertical-align:top}
  .id{font-family:"IBM Plex Mono",monospace;font-weight:600;color:#1B4F8A;width:34px;text-align:center}
  .fv{color:#7A8B9C;font-size:8.5px;margin-top:2px}
  .bx{text-align:center;font-size:15px;width:26px}
  .ob{width:190px}
  .pt td{height:19px}
  @media print{body{margin:0;font-size:10px}h2{break-after:avoid}tr{break-inside:avoid}}</style>
  <div class="marca">Clínica Piedecuesta S.A.</div>
  <h1>Ronda de seguridad del paciente — instrumento de verificación</h1>
  <div class="sub">${esc(visita.sede)} · ${esc(visita.municipio)} · Sede ambulatoria<br>
  Guía Técnica de Buenas Prácticas para la Seguridad del Paciente (MinSalud) · Resolución 3100 de 2019</div>
  <div class="kv"><span>Fecha: ${fmtF(visita.fecha)}</span><span>Auditor: ${esc(visita.auditor) || '&nbsp;'}</span>
    <span>Acompañantes: ${esc(visita.acompanantes) || '&nbsp;'}</span><span>Hora de inicio / cierre:&nbsp;</span></div>
  <p style="font-size:9.5px;color:#666">Marque una sola casilla por ítem. <b>C</b> cumple · <b>NC</b> no cumple · <b>NA</b> no aplica.
  El porcentaje se calcula C ÷ (C + NC); los NA quedan fuera del denominador.</p>
  ${grupos
    .map(
      (g) => `<h2>${esc(g.t)}</h2><table><thead><tr><th>ID</th><th>Ítem verificable / fuente de verificación</th>
    <th class="bx">C</th><th class="bx">NC</th><th class="bx">NA</th><th>Observación / hallazgo</th></tr></thead>
    <tbody>${g.its.map(fila).join('')}</tbody></table>`,
    )
    .join('')}
  ${mtx('Matriz · insumos de higiene de manos por punto de atención', CHK_HM, 'Punto de atención')}
  ${mtx('Matriz · rotulación por área', CHK_RT, 'Área o punto')}
  <h2>Formulario de observación de higiene de manos (OMS)</h2>
  <p style="font-size:9.5px;color:#666">Una fila por oportunidad. Momentos: 1 antes de tocar al usuario · 2 antes de tarea aséptica ·
  3 después de exposición a fluidos · 4 después de tocar al usuario · 5 después del contacto con el entorno.
  Adherencia = (fricción + lavado) ÷ oportunidades.</p>
  <table class="pt"><thead><tr><th style="width:150px">Cargo observado</th><th>M1</th><th>M2</th><th>M3</th><th>M4</th><th>M5</th>
  <th>Fricción</th><th>Lavado</th><th>Omisión</th><th style="width:120px">Observación</th></tr></thead><tbody>
  ${Array.from({ length: 22 })
    .map(() => `<tr><td>&nbsp;</td>${Array.from({ length: 8 }).map(() => '<td class="bx">&#9744;</td>').join('')}<td></td></tr>`)
    .join('')}
  </tbody></table>
  <h2>Conclusiones y compromisos</h2>
  <div style="border:1px solid #DBE3EC;height:90px"></div>
  <div style="margin-top:34px;display:grid;grid-template-columns:1fr 1fr;gap:40px">
    <div style="border-top:1px solid #12212F;padding-top:4px;text-align:center;font-size:10px">Auditor</div>
    <div style="border-top:1px solid #12212F;padding-top:4px;text-align:center;font-size:10px">Responsable de la sede</div></div>
  <script>window.onload=function(){window.print()}<\/script>`);
  popup.document.close();
  return true;
}
