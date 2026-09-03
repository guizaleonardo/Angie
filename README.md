# Rondas de seguridad del paciente

Aplicación frontend para programar, aplicar y hacer seguimiento a rondas de seguridad del paciente, según la Guía Técnica de Buenas Prácticas y la Resolución 3100 de 2019.

Es una migración a React del HTML original. No hay backend, API ni base de datos: toda la información vive en el navegador.

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

- Rondas hospitalarias: `rsp:v1`
- Rondas ambulatorias: `rsp_sede_v1`

- Se cargan al iniciar.
- Se guardan automáticamente (con un breve debounce) cuando cambia una ronda, un resultado, una observación o un plan 5W1H.
- No se pierden al recargar, cerrar la pestaña o volver a abrir el navegador.
- Si `localStorage` no está disponible o falla la escritura, la aplicación sigue funcionando y muestra un aviso para exportar el respaldo.

Los datos maestros están en `src/data/rondas.ts` (hospitalarias) y `src/data/ambulatoria.ts` (ambulatorias) y no se modifican desde la interfaz.

El encabezado tiene un switch **Hospitalarias / Ambulatorias** para cambiar de aplicación. Cada una tiene su propio menú, datos maestros y persistencia.

## Vistas hospitalarias

| Ruta | Contenido |
| --- | --- |
| `/` | Tablero con KPIs, cumplimiento por servicio/bloque, tendencia y reincidencia |
| `/rondas` | Programar y listar rondas |
| `/aplicar/:id` | Verificar ítems (C / NC / NA) y observaciones |
| `/hallazgos` | Planes de mejoramiento 5W1H |
| `/datos` | Exportar CSV, respaldo JSON, restaurar, imprimir acta y borrar datos |

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
├── pages/          Hospitalarias y pages/ambulatoria
├── context/        Estado hospitalario, ambulatorio y notificaciones
├── data/           Catálogos maestros (rondas.ts y ambulatoria.ts)
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
