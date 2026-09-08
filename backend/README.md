# API ANGA — Rondas de seguridad del paciente

Backend REST con MongoDB para la app web y Android. Cubre las tres modalidades del front:

- **Hospitalaria**: rondas por servicio, ítems C/NC/NA, planes 5W1H, tablero y respaldos.
- **Ambulatoria**: visita de sede (áreas, prácticas transversales, puntos de higiene/rotulación, observación OMS).
- **Principal**: visita de sede principal (mismos flujos, con bloques transversales conmutables).

Los catálogos maestros se copian desde `src/data` del repositorio (`npm run sync-catalogs`). Los resultados viven en MongoDB.

## Requisitos

- Node.js 18 o superior
- MongoDB 6/7 (local, Atlas o Docker)

## Arranque rápido

```bash
cd backend
copy .env.example .env
npm install
npm run sync-catalogs
npm run dev
```

API en `http://localhost:4000`. Salud: `GET /api/health`.

MongoDB con Docker:

```bash
docker compose up mongo -d
```

API + Mongo:

```bash
docker compose up --build
```

## Variables de entorno

| Variable | Default | Uso |
| --- | --- | --- |
| `PORT` | `4000` | Puerto HTTP |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/anga` | Cadena de conexión |
| `CORS_ORIGIN` | `http://localhost:5173,http://127.0.0.1:5173` | Orígenes del frontend permitidos (lista separada por comas). No se admite `*` |
| `API_KEY` | vacío | No usar. Las peticiones se limitan al origen del frontend |
| `NODE_ENV` | `development` | `production` en despliegue |

El backend **no acepta** peticiones de Postman, curl u otros orígenes. Cada request (salvo `GET /api/health`) debe traer `Origin` o `Referer` de un frontend listado en `CORS_ORIGIN`. En producción agregue la URL real, por ejemplo `https://su-app.vercel.app`.

## Contrato de respuesta

Éxito:

```json
{ "ok": true, "data": { } }
```

Error:

```json
{ "ok": false, "error": { "code": "not_found", "message": "…" } }
```

Los CSV y respaldos JSON se descargan como archivo (no van envueltos en `{ ok, data }`).

## Endpoints

### Catálogos (web y móvil)

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/catalogos` | Índice de modalidades (sin ítems) |
| GET | `/api/catalogos/:modalidad` | Catálogo completo (`hospitalaria` \| `ambulatoria` \| `principal`) |
| GET | `/api/catalogos/:modalidad/servicios/:codigo/items` | Ítems transversales + del servicio/área |

### Rondas hospitalarias

| Método | Ruta | Cuerpo |
| --- | --- | --- |
| GET | `/api/rondas` | Lista con conteo y nivel |
| POST | `/api/rondas` | `{ servicioCod, fecha?, lider?, acompanantes? }` |
| GET | `/api/rondas/:id` | Ronda + ítems + hallazgos |
| PATCH | `/api/rondas/:id` | `{ fecha?, lider?, acompanantes?, obs? }` |
| DELETE | `/api/rondas/:id` | Borra la ronda y sus planes |
| PUT | `/api/rondas/:id/resultados/:itemId` | `{ r: "C"\|"NC"\|"NA" }` (mismo valor = desmarcar) |
| PATCH | `/api/rondas/:id/resultados/:itemId/obs` | `{ obs }` |
| PATCH | `/api/rondas/:id/obs` | `{ obs }` |
| POST | `/api/rondas/:id/marcar-todo` | `{ estado }` — solo ítems aún vacíos |
| POST | `/api/rondas/:id/limpiar-resultados` | |

### Planes 5W1H hospitalarios

| Método | Ruta | Cuerpo |
| --- | --- | --- |
| GET | `/api/hallazgos?filtro=abiertos\|vencidos\|todos&rondaId=` | |
| POST | `/api/hallazgos` | `{ rondaId, itemId }` — rellena propuesta de biblioteca |
| POST | `/api/hallazgos/generar-pendientes` | Crea un plan por cada NC sin plan |
| PATCH | `/api/hallazgos/:id` | Campos 5W1H, criticidad, estado, evidencia |
| POST | `/api/hallazgos/:id/validar` | Quita marca de propuesta |
| POST | `/api/hallazgos/:id/restaurar-propuesta` | Restaura texto de biblioteca |
| DELETE | `/api/hallazgos/:id` | |

Al cerrar un plan (`estado: "Cerrado"`) se asigna `fechaCierre` si venía vacía.

### Visitas (ambulatoria / principal)

| Método | Ruta | Cuerpo |
| --- | --- | --- |
| GET | `/api/visitas?modalidad=` | Listado resumido |
| POST | `/api/visitas` | `{ modalidad, sede?, municipio?, fecha?, auditor?, areas?, bloques? }` |
| GET | `/api/visitas/:id` | Documento completo (compatible con el JSON del front) |
| PATCH | `/api/visitas/:id` | Campos de identificación |
| PUT | `/api/visitas/:id` | Restaurar/reemplazar visita |
| DELETE | `/api/visitas/:id` | |
| POST | `/api/visitas/:id/reiniciar` | Descarta resultados, conserva id |
| POST | `/api/visitas/:id/areas/:codigo/toggle` | |
| POST | `/api/visitas/:id/bloques/:codigo/toggle` | Solo sede principal |
| PUT | `/api/visitas/:id/resultados` | `{ scope, itemId, r }` — `scope` es `T` o el código de área |
| PATCH | `/api/visitas/:id/resultados/obs` | `{ scope, itemId, obs }` |
| POST | `/api/visitas/:id/planes` | `{ scope, itemId }` |
| POST | `/api/visitas/:id/planes/generar-pendientes` | |
| PATCH | `/api/visitas/:id/planes/:planId` | Campos 5W1H |
| POST | `/api/visitas/:id/planes/:planId/validar` | |
| DELETE | `/api/visitas/:id/planes/:planId` | |
| POST | `/api/visitas/:id/obs-hm` | `{ cargo, momento, accion: "FR"\|"LM"\|"OM" }` |
| DELETE | `/api/visitas/:id/obs-hm/:obsId` | |
| POST | `/api/visitas/:id/puntos/:tipo` | `tipo` = `HM` (7 checks) o `RT` (5) |
| PATCH | `/api/visitas/:id/puntos/:tipo/:index` | `{ n }` nombre del punto |
| POST | `/api/visitas/:id/puntos/:tipo/:index/tick` | `{ col }` ciclo Sí → No → NA → vacío |
| DELETE | `/api/visitas/:id/puntos/:tipo/:index` | |
| GET | `/api/visitas/:id/resumen` | Cumplimiento, puntos y adherencia OMS |
| GET | `/api/visitas/:id/export/json` | Respaldo intercambiable con el front |
| GET | `/api/visitas/:id/export/csv/detalle` | |
| GET | `/api/visitas/:id/export/csv/planes` | |

### Tablero y datos hospitalarios

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/dashboard/hospitalaria` | KPIs, servicios, bloques, tendencia, reincidencia |
| GET | `/api/datos/hospitalaria` | JSON `rsp:v1` (rondas + hallazgos + seq) |
| GET | `/api/datos/hospitalaria/respaldo` | Descarga del mismo JSON |
| PUT | `/api/datos/hospitalaria` | Restaura un respaldo del front o del móvil |
| DELETE | `/api/datos/hospitalaria` | Borra rondas y planes |
| GET | `/api/datos/hospitalaria/csv/rondas` | Consolidado |
| GET | `/api/datos/hospitalaria/csv/detalle` | Ítem por ítem |
| GET | `/api/datos/hospitalaria/csv/hallazgos` | Planes 5W1H |

Los respaldos JSON son el mismo esquema `version: 1` que usa `localStorage` (`rsp:v1`) y DataStore en Android, así que un archivo exportado en web o móvil se puede restaurar aquí.

## App móvil (Android)

La app nativa hoy persiste en el dispositivo. Para apuntarla a este backend:

1. `GET /api/catalogos/hospitalaria` sustituye `catalog.json`.
2. `GET/PUT /api/datos/hospitalaria` sustituye el blob `AppData`.
3. O bien usar los endpoints granulares (`/api/rondas`, `/api/hallazgos`) para no reescribir el documento completo en cada marca.

La app nativa no está autorizada contra esta API: solo el frontend web listado en `CORS_ORIGIN` puede llamar al backend.

## Identificadores

- Rondas: `R-001`, planes hospitalarios: `H-002` (secuencia compartida, igual que el front).
- Visitas: `V-YYYYMMDD`, con sufijo `-2` si hay más de una el mismo día.
- Planes de visita: `H-001` interno a cada visita.

## Estructura

```text
backend/
├── catalog/           JSON generado (no editar a mano)
├── scripts/           sync-catalogs.mjs
├── src/
│   ├── catalog/       carga e índices de ítems
│   ├── models/        Ronda, Hallazgo, Visita, Counter
│   ├── routes/
│   ├── services/
│   ├── app.ts
│   └── index.ts
├── Dockerfile
└── docker-compose.yml
```

Tras cambiar `src/data/rondas.ts`, `ambulatoria.ts` o `principal.ts` en el front:

```bash
npm run sync-catalogs
```
