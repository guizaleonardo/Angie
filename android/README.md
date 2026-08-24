# Rondas de seguridad del paciente — Android

Versión móvil nativa de la aplicación web. Misma funcionalidad: programar rondas, verificar ítems (C / NC / NA), planes 5W1H, tablero de KPIs y exportación de datos.

## Requisitos

- Android Studio Chipmunk (2021.2) o superior con AGP 7.2.x
- JDK 11 o superior
- Android SDK 33

## Abrir el proyecto

1. En Android Studio: **File → Open** y seleccione la carpeta `android/`.
2. Espere a que Gradle sincronice las dependencias.
3. Ejecute en emulador o dispositivo (**Run ▶**).

Desde terminal (con `gradlew`):

```bash
cd android
./gradlew assembleDebug
```

En Windows:

```powershell
cd android
.\gradlew.bat assembleDebug
```

## Vistas

| Pantalla | Contenido |
| --- | --- |
| Tablero | KPIs, cumplimiento por servicio/bloque, tendencia y reincidencia |
| Rondas | Programar y listar rondas |
| Aplicar | Verificar ítems y observaciones |
| Hallazgos | Planes de mejoramiento 5W1H |
| Datos | Exportar CSV, respaldo JSON, restaurar, acta HTML y borrar datos |

## Persistencia

Los datos se guardan localmente en el dispositivo (DataStore), con el mismo esquema versionado `rsp:v1` que la app web. Los respaldos JSON exportados desde web o móvil son intercambiables.

## Catálogo maestro

Los bloques e ítems de verificación están en `app/src/main/assets/catalog.json`, generado desde `src/data/rondas.ts` de la app web.

## Stack

- Kotlin
- Jetpack Compose + Material 3
- Navigation Compose
- DataStore Preferences
- kotlinx.serialization
