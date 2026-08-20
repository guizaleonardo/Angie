import { BLOQUES, itemPorId, itemsDeServicio } from '../data/rondas';
import type { AppData, Hallazgo, Ronda } from '../types';
import { conteo, nivel, semaforoHallazgo } from '../utils/calculations';
import { downloadFile, toCsv } from '../utils/csv';
import { periodo } from '../utils/format';

export function exportCsvRondas(rondas: Ronda[]): void {
  const filas: unknown[][] = [[
    'ID ronda',
    'Fecha',
    'Periodo',
    'Servicio',
    'Líder',
    'Acompañantes',
    'Cumple',
    'No cumple',
    'No aplica',
    'Evaluados',
    '% cumplimiento',
    'Nivel',
    'Observación general',
  ]];
  rondas.forEach((ronda) => {
    const c = conteo(ronda);
    filas.push([
      ronda.id,
      ronda.fecha,
      periodo(ronda.fecha),
      ronda.servicio,
      ronda.lider,
      ronda.acompanantes,
      c.C,
      c.NC,
      c.NA,
      c.den,
      c.pct == null ? '' : (c.pct * 100).toFixed(1).replace('.', ','),
      nivel(c.pct).t,
      ronda.obs,
    ]);
  });
  downloadFile('rondas_consolidado.csv', toCsv(filas), 'text/csv;charset=utf-8');
}

export function exportCsvDetalle(rondas: Ronda[]): void {
  const filas: unknown[][] = [[
    'ID ronda',
    'Fecha',
    'Servicio',
    'Bloque',
    'Nombre del bloque',
    'ID ítem',
    'Ítem verificable',
    'Resultado',
    'Observación',
    'Fuente de verificación',
    'Referencia normativa',
  ]];
  rondas.forEach((ronda) => {
    itemsDeServicio(ronda.servicioCod).forEach((item) => {
      const valor = ronda.resultados[item.id];
      if (!valor?.r) return;
      filas.push([
        ronda.id,
        ronda.fecha,
        ronda.servicio,
        item.bloque,
        item.bloque_nombre,
        item.id,
        item.item,
        valor.r,
        valor.obs || '',
        item.fuente,
        item.referencia,
      ]);
    });
  });
  downloadFile('rondas_detalle_items.csv', toCsv(filas), 'text/csv;charset=utf-8');
}

export function exportCsvHallazgos(data: AppData): void {
  const filas: unknown[][] = [[
    'ID plan',
    'ID ronda',
    'Fecha ronda',
    'Servicio',
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
    'Fecha de cierre',
    'Evidencia',
    'Semáforo',
    'Origen del texto',
  ]];
  data.hallazgos.forEach((hallazgo: Hallazgo) => {
    const item = itemPorId(hallazgo.itemId);
    filas.push([
      hallazgo.id,
      hallazgo.rondaId,
      hallazgo.fecha,
      hallazgo.servicio,
      hallazgo.itemId,
      item?.item || '',
      hallazgo.desc,
      hallazgo.criticidad,
      hallazgo.que,
      hallazgo.porque,
      hallazgo.donde,
      hallazgo.quien,
      hallazgo.cuando,
      hallazgo.como,
      hallazgo.estado,
      hallazgo.fechaCierre,
      hallazgo.evidencia,
      semaforoHallazgo(hallazgo),
      hallazgo.sugerido ? 'Propuesta sin validar' : 'Validado por el auditor',
    ]);
  });
  downloadFile('planes_mejoramiento_5w1h.csv', toCsv(filas), 'text/csv;charset=utf-8');
}

export function filasBloqueActa(ronda: Ronda): Array<[string, number, number, number, string]> {
  const filas: Array<[string, number, number, number, string]> = [];
  BLOQUES.forEach((bloque) => {
    const lista = itemsDeServicio(ronda.servicioCod).filter((item) => item.bloque === bloque.codigo);
    if (!lista.length) return;
    let C = 0;
    let NC = 0;
    let NA = 0;
    lista.forEach((item) => {
      const valor = ronda.resultados[item.id]?.r;
      if (valor === 'C') C += 1;
      else if (valor === 'NC') NC += 1;
      else if (valor === 'NA') NA += 1;
    });
    if (C + NC + NA) {
      filas.push([
        `${bloque.codigo} · ${bloque.nombre}`,
        C,
        NC,
        NA,
        C + NC ? `${((C / (C + NC)) * 100).toFixed(1)} %` : '—',
      ]);
    }
  });
  return filas;
}
