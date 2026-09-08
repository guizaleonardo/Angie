import { ACCIONES, CHK_HM, CHK_RT } from '../data/ambulatoria';
import type { Item } from '../types';
import type { VisitaAmb } from '../types/ambulatoria';
import { resDe } from '../utils/ambulatoria';
import { downloadFile, toCsv } from '../utils/csv';
import { AMBULATORIA_CONFIG, type VisitaCatalog } from '../visita/config';

export function exportCsvDetalleAmb(visita: VisitaAmb, catalog: VisitaCatalog = AMBULATORIA_CONFIG): void {
  const filas: unknown[][] = [[
    'Sede',
    'Fecha',
    'Ámbito',
    'Bloque',
    'Nombre del bloque',
    'ID ítem',
    'Ítem',
    'Resultado',
    'Observación',
    'Fuente de verificación',
    'Referencia',
  ]];

  const add = (scope: string, item: Item) => {
    const v = resDe(visita, scope, item.id);
    if (!v.r) return;
    filas.push([
      visita.sede,
      visita.fecha,
      scope === 'T' ? 'Toda la sede' : catalog.nombreBloque[scope] || scope,
      item.bloque,
      item.bloque_nombre,
      item.id,
      item.item,
      v.r,
      v.obs || '',
      item.fuente,
      item.referencia,
    ]);
  };

  catalog.itemsTransversales(visita).forEach((item) => add('T', item));
  visita.areas.forEach((area) => catalog.itemsDeArea(area).forEach((item) => add(area, item)));

  visita.puntosHM.forEach((punto) => {
    if (!punto.c.some((x) => x != null)) return;
    filas.push([
      visita.sede,
      visita.fecha,
      'Punto de higiene de manos',
      'B',
      'Higiene de manos',
      'B12',
      punto.n,
      punto.c.every((x) => x === true || x === 'NA') ? 'C' : 'NC',
      CHK_HM.map((c, i) => `${c}: ${punto.c[i] === true ? 'sí' : punto.c[i] === false ? 'NO' : punto.c[i] === 'NA' ? 'NA' : '-'}`).join(' | '),
      'Verificación punto por punto',
      '',
    ]);
  });

  visita.puntosRT.forEach((punto) => {
    if (!punto.c.some((x) => x != null)) return;
    filas.push([
      visita.sede,
      visita.fecha,
      'Punto de rotulación',
      'Q',
      'Rotulación y trazabilidad',
      'Q10',
      punto.n,
      punto.c.every((x) => x === true || x === 'NA') ? 'C' : 'NC',
      CHK_RT.map((c, i) => `${c}: ${punto.c[i] === true ? 'sí' : punto.c[i] === false ? 'NO' : punto.c[i] === 'NA' ? 'NA' : '-'}`).join(' | '),
      'Verificación punto por punto',
      '',
    ]);
  });

  visita.obsHM.forEach((obs) => {
    filas.push([
      visita.sede,
      visita.fecha,
      'Observación higiene de manos',
      'MM',
      'Adherencia observada',
      'OBS',
      `Cargo: ${obs.cargo} · Momento ${obs.momento}`,
      obs.accion === 'OM' ? 'NC' : 'C',
      (ACCIONES.find((a) => a[0] === obs.accion) || [])[1] || '',
      'Observación directa metodología OMS',
      '',
    ]);
  });

  downloadFile('ronda_sede_detalle.csv', toCsv(filas), 'text/csv;charset=utf-8');
}

export function exportCsvPlanesAmb(visita: VisitaAmb, catalog: VisitaCatalog = AMBULATORIA_CONFIG): void {
  const filas: unknown[][] = [[
    'ID',
    'Sede',
    'Fecha',
    'Área',
    'ID ítem',
    'Ítem',
    'Hallazgo',
    'Criticidad',
    'QUÉ',
    'POR QUÉ',
    'DÓNDE',
    'QUIÉN',
    'CUÁNDO',
    'CÓMO',
    'Estado',
    'Origen del texto',
  ]];
  visita.hallazgos.forEach((h) => {
    const item = catalog.itemPorId(h.itemId);
    filas.push([
      h.id,
      visita.sede,
      visita.fecha,
      h.area,
      h.itemId,
      item?.item || '',
      h.desc,
      h.criticidad,
      h.que,
      h.porque,
      h.donde,
      h.quien,
      h.cuando,
      h.como,
      h.estado,
      h.sugerido ? 'Propuesta sin validar' : 'Validado por el auditor',
    ]);
  });
  downloadFile('ronda_sede_planes.csv', toCsv(filas), 'text/csv;charset=utf-8');
}

export function exportRespaldoAmb(visita: VisitaAmb): void {
  downloadFile(
    `respaldo_visita_${visita.fecha}.json`,
    JSON.stringify(visita, null, 1),
    'application/json',
  );
}
