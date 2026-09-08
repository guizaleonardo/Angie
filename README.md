# Rondas de seguridad del paciente

Aplicación frontend para programar, aplicar y hacer seguimiento a rondas de seguridad del paciente, según la Guía Técnica de Buenas Prácticas y la Resolución 3100 de 2019.

Es una migración a React del HTML original. El front y Android pueden seguir en local; hay un backend REST + MongoDB en `backend/` para persistencia compartida (ver `backend/README.md`).

## Requisitos

- Node.js 18 o superior
- npm

## Instalación y arranque

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

## Build de producción

```bash
npm run build
npm run preview
```

## Persistencia

Los datos de evaluación se guardan en `localStorage` con claves separadas:

- Sede principal: `rsp_principal_v1`
- Rondas ambulatorias: `rsp_sede_v1`

- Se cargan al iniciar.
- Se guardan automáticamente (con un breve debounce) cuando cambia una ronda, un resultado, una observación o un plan 5W1H.
- No se pierden al recargar, cerrar la pestaña o volver a abrir el navegador.
- Si `localStorage` no está disponible o falla la escritura, la aplicación sigue funcionando y muestra un aviso para exportar el respaldo.

Los datos maestros están en `src/data/principal.ts` (sede principal) y `src/data/ambulatoria.ts` (ambulatorias) y no se modifican desde la interfaz.

El encabezado tiene un switch **Sede principal / Ambulatorias**. Cada una tiene su propio menú, catálogo y persistencia.

## Vistas sede principal (asistencial)

Instrumento de visita de la sede principal: ronda por área o de toda la sede, con bloques transversales seleccionables.

| Ruta | Contenido |
| --- | --- |
| `/` | Identificación de la visita, áreas, bloques transversales y avance |
| `/practicas` | Prácticas seguras transversales |
| `/areas` | Módulos de urgencias, hospitalización, UCI, cirugía, etc. |
| `/puntos` | Observación OMS, insumos de higiene y rotulación |
| `/hallazgos` | Planes 5W1H de la visita |
| `/informe` | Informe general, CSV e instrumento en blanco |

## Vistas ambulatorias

Instrumento para sede sin camas ni hospitalización (consulta y procedimientos).

| Ruta | Contenido |
| --- | --- |
| `/ambulatoria` | Identificación de la visita, áreas presentes y avance |
| `/ambulatoria/practicas` | Prácticas seguras transversales |
| `/ambulatoria/areas` | Módulos específicos de las áreas marcadas |
| `/ambulatoria/puntos` | Observación OMS, insumos de higiene y rotulación |
| `/ambulatoria/hallazgos` | Planes 5W1H de la visita |
| `/ambulatoria/informe` | Informe general, CSV e instrumento en blanco |

## Exportación e impresión

- CSV consolidado de rondas
- CSV detalle ítem por ítem
- CSV de planes 5W1H
- Respaldo JSON completo y restauración
- Acta imprimible de una ronda (ventana nueva; puede bloquearse si el navegador impide pop-ups)

## Estructura

```text
src/
├── components/     UI reutilizable (Layout, KPI, RondaItem, Toast, …)
├── pages/          Instrumento de visita (sede principal y ambulatoria)
├── context/        Estado de visita y notificaciones
├── data/           Catálogos maestros (principal.ts y ambulatoria.ts)
├── hooks/          useLocalStorage
├── services/       localStorage, CSV y acta
├── types/          Tipos TypeScript
├── utils/          Cálculos y formato
├── App.tsx
├── main.tsx
└── index.css
```

## Stack

- React 18
- Vite
- TypeScript
- React Router
- CSS global (IBM Plex y paleta azul)
