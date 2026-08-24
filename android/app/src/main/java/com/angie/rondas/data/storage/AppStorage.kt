package com.angie.rondas.data.storage

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.angie.rondas.data.model.AppData
import com.angie.rondas.data.model.Criticidad
import com.angie.rondas.data.model.EstadoHallazgo
import com.angie.rondas.data.model.Hallazgo
import com.angie.rondas.data.model.ItemResultado
import com.angie.rondas.data.model.ResultadoEstado
import com.angie.rondas.data.model.Ronda
import com.angie.rondas.data.model.StoredAppData
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "rondas_storage")

class AppStorage(private val context: Context) {
    private val json = Json {
        ignoreUnknownKeys = true
        encodeDefaults = true
    }

    companion object {
        const val STORAGE_KEY = "rsp:v1"
        private val LEGACY_KEYS = listOf("rsp_datos_v1", "rondas-seguridad-paciente")
        private val DATA_KEY = stringPreferencesKey(STORAGE_KEY)
    }

    val appData: Flow<AppData> = context.dataStore.data.map { prefs ->
        val raw = prefs[DATA_KEY]
        if (raw.isNullOrBlank()) {
            AppData()
        } else {
            normalizeAppData(json.decodeFromString<StoredAppData>(raw)) ?: AppData()
        }
    }

    suspend fun load(): AppData = appData.first()

    suspend fun save(data: AppData): Boolean = try {
        context.dataStore.edit { prefs ->
            prefs[DATA_KEY] = json.encodeToString(
                StoredAppData(
                    version = 1,
                    rondas = data.rondas,
                    hallazgos = data.hallazgos,
                    seq = data.seq,
                ),
            )
        }
        true
    } catch (_: Exception) {
        false
    }

    fun serializeBackup(data: AppData): String = json.encodeToString(
        StoredAppData(
            version = 1,
            rondas = data.rondas,
            hallazgos = data.hallazgos,
            seq = data.seq,
        ),
    )

    fun normalizeFromJson(raw: String): AppData? {
        val element = json.parseToJsonElement(raw)
        return normalizeAppData(element)
    }

    private fun normalizeAppData(raw: Any?): AppData? {
        val source = when (raw) {
            is StoredAppData -> raw
            is JsonObject -> StoredAppData(
                version = raw["version"]?.jsonPrimitive?.content?.toIntOrNull() ?: 1,
                rondas = raw["rondas"]?.jsonArray?.mapNotNull { normalizeRonda(it.jsonObject) } ?: emptyList(),
                hallazgos = raw["hallazgos"]?.jsonArray?.mapNotNull { normalizeHallazgo(it.jsonObject) } ?: emptyList(),
                seq = raw["seq"]?.jsonPrimitive?.content?.toIntOrNull() ?: 0,
            )
            else -> return null
        }
        if (source.rondas.isEmpty() && raw is JsonObject && raw["rondas"] == null) return null
        return AppData(
            rondas = source.rondas,
            hallazgos = source.hallazgos,
            seq = source.seq,
        )
    }

    private fun normalizeRonda(obj: JsonObject): Ronda? {
        val id = obj["id"]?.jsonPrimitive?.content?.takeIf { it.isNotBlank() } ?: return null
        val resultadosObj = obj["resultados"]?.jsonObject ?: return Ronda(
            id = id,
            servicioCod = obj["servicioCod"]?.jsonPrimitive?.content.orEmpty(),
            servicio = obj["servicio"]?.jsonPrimitive?.content.orEmpty(),
            fecha = obj["fecha"]?.jsonPrimitive?.content.orEmpty(),
            lider = obj["lider"]?.jsonPrimitive?.content.orEmpty(),
            acompanantes = obj["acompanantes"]?.jsonPrimitive?.content.orEmpty(),
            obs = obj["obs"]?.jsonPrimitive?.content.orEmpty(),
        )
        val resultados = resultadosObj.mapNotNull { (key, value) ->
            val itemObj = value.jsonObject
            val estado = when (itemObj["r"]?.jsonPrimitive?.content) {
                "C" -> ResultadoEstado.C
                "NC" -> ResultadoEstado.NC
                "NA" -> ResultadoEstado.NA
                else -> return@mapNotNull null
            }
            key to ItemResultado(estado, itemObj["obs"]?.jsonPrimitive?.content.orEmpty())
        }.toMap()
        return Ronda(
            id = id,
            servicioCod = obj["servicioCod"]?.jsonPrimitive?.content.orEmpty(),
            servicio = obj["servicio"]?.jsonPrimitive?.content.orEmpty(),
            fecha = obj["fecha"]?.jsonPrimitive?.content.orEmpty(),
            lider = obj["lider"]?.jsonPrimitive?.content.orEmpty(),
            acompanantes = obj["acompanantes"]?.jsonPrimitive?.content.orEmpty(),
            obs = obj["obs"]?.jsonPrimitive?.content.orEmpty(),
            resultados = resultados,
        )
    }

    private fun normalizeHallazgo(obj: JsonObject): Hallazgo? {
        val id = obj["id"]?.jsonPrimitive?.content?.takeIf { it.isNotBlank() } ?: return null
        val criticidad = when (obj["criticidad"]?.jsonPrimitive?.content) {
            "Alta" -> Criticidad.Alta
            "Baja" -> Criticidad.Baja
            else -> Criticidad.Media
        }
        val estado = when (obj["estado"]?.jsonPrimitive?.content) {
            "En ejecución" -> EstadoHallazgo.EnEjecucion
            "Cerrado" -> EstadoHallazgo.Cerrado
            else -> EstadoHallazgo.Abierto
        }
        return Hallazgo(
            id = id,
            rondaId = obj["rondaId"]?.jsonPrimitive?.content.orEmpty(),
            itemId = obj["itemId"]?.jsonPrimitive?.content.orEmpty(),
            servicioCod = obj["servicioCod"]?.jsonPrimitive?.content.orEmpty(),
            servicio = obj["servicio"]?.jsonPrimitive?.content.orEmpty(),
            bloque = obj["bloque"]?.jsonPrimitive?.content.orEmpty(),
            fecha = obj["fecha"]?.jsonPrimitive?.content.orEmpty(),
            desc = obj["desc"]?.jsonPrimitive?.content.orEmpty(),
            criticidad = criticidad,
            que = obj["que"]?.jsonPrimitive?.content.orEmpty(),
            porque = obj["porque"]?.jsonPrimitive?.content.orEmpty(),
            donde = obj["donde"]?.jsonPrimitive?.content.orEmpty(),
            quien = obj["quien"]?.jsonPrimitive?.content.orEmpty(),
            cuando = obj["cuando"]?.jsonPrimitive?.content.orEmpty(),
            como = obj["como"]?.jsonPrimitive?.content.orEmpty(),
            estado = estado,
            fechaCierre = obj["fechaCierre"]?.jsonPrimitive?.content.orEmpty(),
            evidencia = obj["evidencia"]?.jsonPrimitive?.content.orEmpty(),
            sugerido = obj["sugerido"]?.jsonPrimitive?.content?.toBooleanStrictOrNull() ?: false,
        )
    }
}
