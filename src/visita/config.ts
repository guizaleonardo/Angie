import type { Bloque, Item } from '../types';
import type { VisitaAmb } from '../types/ambulatoria';
import {
  AMB_BLOQUES_SERVICIO,
  AMB_BLOQUES_TRANSVERSALES,
  AMB_CODIGOS_TRANSVERSALES,
  AMB_NOMBRE_BLOQUE,
  AREAS_DEFAULT,
  itemAmbPorId,
  itemsDeArea,
  itemsTransversales,
} from '../data/ambulatoria';
import {
  PRESET_HIGIENE,
  PRESET_SEGURIDAD,
  PRI_AREAS_DEFAULT,
  PRI_BLOQUES_SERVICIO,
  PRI_BLOQUES_TRANSVERSALES,
  PRI_CODIGOS_TRANSVERSALES,
  PRI_NOMBRE_BLOQUE,
  itemPriPorId,
  itemsDeAreaPrincipal,
  itemsTransversalesPrincipal,
} from '../data/principal';
import { hoy } from '../utils/format';

export interface VisitaCatalog {
  itemsTransversales: (visita: VisitaAmb) => Item[];
  itemsDeArea: (codigo: string) => Item[];
  itemPorId: (id: string) => Item | undefined;
  bloquesTransversales: Bloque[];
  bloquesServicio: Bloque[];
  nombreBloque: Record<string, string>;
  ordenAreas: string[];
  ordenBloques: string[];
}

export interface BloquePreset {
  label: string;
  bloques: string[];
}

export interface VisitaConfig extends VisitaCatalog {
  id: 'principal' | 'ambulatoria';
  storageKey: string;
  basePath: string;
  titulo: string;
  subtitulo: string;
  ambitoLabel: string;
  avisoAreas: string;
  avisoPracticas: string;
  allowToggleBloques: boolean;
  presets: BloquePreset[];
  createVisita: () => VisitaAmb;
}

function visitaBase(
  sede: string,
  municipio: string,
  areas: string[],
  bloques: string[],
): VisitaAmb {
  return {
    id: `V-${hoy().replace(/-/g, '')}`,
    sede,
    municipio,
    fecha: hoy(),
    auditor: '',
    acompanantes: '',
    alcance: '',
    concl: '',
    areas: [...areas],
    bloques: [...bloques],
    transv: {},
    areasRes: {},
    puntosHM: [],
    puntosRT: [],
    obsHM: [],
    hallazgos: [],
    seq: 0,
  };
}

export const PRINCIPAL_CONFIG: VisitaConfig = {
  id: 'principal',
  storageKey: 'rsp_principal_v1',
  basePath: '',
  titulo: 'Rondas de seguridad · Clínica Piedecuesta',
  subtitulo: 'Sede principal — ronda por área o de toda la sede',
  ambitoLabel: 'Sede principal',
  avisoAreas:
    'Marque solo las áreas que va a auditar hoy. Puede hacer una sola área —desmarque el resto— o toda la sede. Los bloques transversales se verifican una vez; para una ronda corta, desmarque abajo los bloques que no va a revisar.',
  avisoPracticas:
    'Se verifican una sola vez para toda la sede. Incluyen identificación del paciente, IAAS e higiene de manos, medicamentos, riesgo del paciente, historia clínica y el bloque de rotulación y trazabilidad.',
  allowToggleBloques: true,
  presets: [
    { label: 'Todos', bloques: [...PRI_CODIGOS_TRANSVERSALES] },
    { label: 'Solo higiene de manos, IAAS y rótulos', bloques: [...PRESET_HIGIENE] },
    { label: 'Solo seguridad del paciente', bloques: [...PRESET_SEGURIDAD] },
  ],
  itemsTransversales: (visita) => itemsTransversalesPrincipal(visita.bloques),
  itemsDeArea: itemsDeAreaPrincipal,
  itemPorId: itemPriPorId,
  bloquesTransversales: PRI_BLOQUES_TRANSVERSALES,
  bloquesServicio: PRI_BLOQUES_SERVICIO,
  nombreBloque: PRI_NOMBRE_BLOQUE,
  ordenAreas: PRI_BLOQUES_SERVICIO.map((b) => b.codigo),
  ordenBloques: PRI_CODIGOS_TRANSVERSALES,
  createVisita: () =>
    visitaBase('Sede principal', 'Piedecuesta, Santander', PRI_AREAS_DEFAULT, PRI_CODIGOS_TRANSVERSALES),
};

export const AMBULATORIA_CONFIG: VisitaConfig = {
  id: 'ambulatoria',
  storageKey: 'rsp_sede_v1',
  basePath: '/ambulatoria',
  titulo: 'Rondas de seguridad · Clínica Piedecuesta',
  subtitulo: 'Sede ambulatoria — sin camas ni pacientes hospitalizados',
  ambitoLabel: 'Sede ambulatoria',
  avisoAreas:
    'Instrumento configurado para sede ambulatoria: no incluye urgencias, hospitalización, UCI ni cirugía. Sin camas ni usuarios hospitalizados: solo consulta y procedimientos ambulatorios. La identificación se verifica de forma documental en admisión y en cada punto de contacto — no se usa manilla.',
  avisoPracticas:
    'Se verifican una sola vez para toda la sede. Incluyen identificación del paciente, IAAS e higiene de manos, medicamentos, riesgo del paciente, historia clínica y el bloque de rotulación y trazabilidad.',
  allowToggleBloques: false,
  presets: [],
  itemsTransversales: (visita) => itemsTransversales(visita.bloques),
  itemsDeArea,
  itemPorId: itemAmbPorId,
  bloquesTransversales: AMB_BLOQUES_TRANSVERSALES,
  bloquesServicio: AMB_BLOQUES_SERVICIO,
  nombreBloque: AMB_NOMBRE_BLOQUE,
  ordenAreas: AMB_BLOQUES_SERVICIO.map((b) => b.codigo),
  ordenBloques: [...AMB_CODIGOS_TRANSVERSALES],
  createVisita: () =>
    visitaBase(
      'Sede Famisanar Barrancabermeja',
      'Barrancabermeja, Santander',
      AREAS_DEFAULT,
      [...AMB_CODIGOS_TRANSVERSALES],
    ),
};

export function pathOf(config: VisitaConfig, suffix = ''): string {
  if (!suffix) return config.basePath || '/';
  return `${config.basePath}${suffix}`;
}
