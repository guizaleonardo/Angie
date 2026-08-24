package com.angie.rondas.data.repository

import com.angie.rondas.data.catalog.CatalogRepository
import com.angie.rondas.data.model.AppData
import com.angie.rondas.data.model.Criticidad
import com.angie.rondas.data.model.EstadoHallazgo
import com.angie.rondas.data.model.Hallazgo
import com.angie.rondas.data.model.ItemResultado
import com.angie.rondas.data.model.ResultadoEstado
import com.angie.rondas.data.model.Ronda
import com.angie.rondas.data.storage.AppStorage
import com.angie.rondas.util.hoy
import com.angie.rondas.util.nextPrefixedId
import com.angie.rondas.util.sumarDias
import kotlinx.coroutines.flow.Flow

data class CrearRondaInput(
    val servicioCod: String,
    val fecha: String,
    val lider: String,
    val acompanantes: String,
)

class AppRepository(
    private val storage: AppStorage,
    val catalog: CatalogRepository,
) {
    val appData: Flow<AppData> = storage.appData

    suspend fun load(): AppData = storage.load()

    suspend fun save(data: AppData): Boolean = storage.save(data)

    fun backupJson(data: AppData): String = storage.serializeBackup(data)

    fun restoreFromJson(raw: String): AppData? = storage.normalizeFromJson(raw)

    suspend fun commit(data: AppData): Boolean = storage.save(data)

    suspend fun crearRonda(data: AppData, input: CrearRondaInput): Pair<AppData, Ronda> {
        val (seq, id) = nextPrefixedId(data.seq, "R")
        val ronda = Ronda(
            id = id,
            servicioCod = input.servicioCod,
            servicio = catalog.nombreDeBloque(input.servicioCod),
            fecha = input.fecha.ifBlank { hoy() },
            lider = input.lider.trim(),
            acompanantes = input.acompanantes.trim(),
        )
        val next = data.copy(seq = seq, rondas = data.rondas + ronda)
        storage.save(next)
        return next to ronda
    }

    suspend fun borrarRonda(data: AppData, id: String): AppData {
        val next = data.copy(
            rondas = data.rondas.filter { it.id != id },
            hallazgos = data.hallazgos.filter { it.rondaId != id },
        )
        storage.save(next)
        return next
    }

    suspend fun marcar(data: AppData, rondaId: String, itemId: String, estado: ResultadoEstado): AppData {
        val next = data.copy(
            rondas = data.rondas.map { ronda ->
                if (ronda.id != rondaId) return@map ronda
                val actual = ronda.resultados[itemId]
                val resultados = ronda.resultados.toMutableMap()
                if (actual?.r == estado) {
                    resultados.remove(itemId)
                } else {
                    resultados[itemId] = ItemResultado(estado, actual?.obs.orEmpty())
                }
                ronda.copy(resultados = resultados)
            },
        )
        storage.save(next)
        return next
    }

    suspend fun setObservacionItem(data: AppData, rondaId: String, itemId: String, obs: String): AppData {
        val next = data.copy(
            rondas = data.rondas.map { ronda ->
                if (ronda.id != rondaId) return@map ronda
                val actual = ronda.resultados[itemId] ?: return@map ronda
                ronda.copy(resultados = ronda.resultados + (itemId to actual.copy(obs = obs)))
            },
        )
        storage.save(next)
        return next
    }

    suspend fun setObservacionRonda(data: AppData, rondaId: String, obs: String): AppData {
        val next = data.copy(
            rondas = data.rondas.map { ronda ->
                if (ronda.id == rondaId) ronda.copy(obs = obs) else ronda
            },
        )
        storage.save(next)
        return next
    }

    suspend fun marcarTodo(data: AppData, rondaId: String, estado: ResultadoEstado): AppData {
        val next = data.copy(
            rondas = data.rondas.map { ronda ->
                if (ronda.id != rondaId) return@map ronda
                val resultados = ronda.resultados.toMutableMap()
                catalog.itemsDeServicio(ronda.servicioCod).forEach { item ->
                    if (!resultados.containsKey(item.id)) {
                        resultados[item.id] = ItemResultado(estado)
                    }
                }
                ronda.copy(resultados = resultados)
            },
        )
        storage.save(next)
        return next
    }

    suspend fun limpiarResultados(data: AppData, rondaId: String): AppData {
        val next = data.copy(
            rondas = data.rondas.map { ronda ->
                if (ronda.id == rondaId) ronda.copy(resultados = emptyMap()) else ronda
            },
        )
        storage.save(next)
        return next
    }

    fun tieneHallazgo(data: AppData, rondaId: String, itemId: String): Boolean =
        data.hallazgos.any { it.rondaId == rondaId && it.itemId == itemId }

    private fun nuevoHallazgo(seq: Int, ronda: Ronda, itemId: String): Pair<Int, Hallazgo>? {
        val item = catalog.itemPorId(itemId) ?: return null
        val (nextSeq, id) = nextPrefixedId(seq, "H")
        val propuesta = item.prop
        val hallazgo = Hallazgo(
            id = id,
            rondaId = ronda.id,
            itemId = itemId,
            servicioCod = ronda.servicioCod,
            servicio = ronda.servicio,
            bloque = item.bloque,
            fecha = ronda.fecha,
            desc = ronda.resultados[itemId]?.obs.orEmpty(),
            criticidad = propuesta?.criticidad ?: Criticidad.Media,
            que = propuesta?.que.orEmpty(),
            porque = propuesta?.porque.orEmpty(),
            donde = ronda.servicio,
            quien = propuesta?.quien.orEmpty(),
            cuando = propuesta?.let { sumarDias(ronda.fecha, it.plazo) }.orEmpty(),
            como = propuesta?.como.orEmpty(),
            sugerido = propuesta != null,
        )
        return nextSeq to hallazgo
    }

    suspend fun crearHallazgo(data: AppData, rondaId: String, itemId: String): AppData? {
        val ronda = data.rondas.find { it.id == rondaId } ?: return null
        val built = nuevoHallazgo(data.seq, ronda, itemId) ?: return null
        val next = data.copy(seq = built.first, hallazgos = data.hallazgos + built.second)
        storage.save(next)
        return next
    }

    suspend fun generarPendientes(data: AppData): Pair<AppData, Int> {
        var seq = data.seq
        val hallazgos = data.hallazgos.toMutableList()
        var creados = 0
        data.rondas.forEach { ronda ->
            ronda.resultados.forEach { (itemId, valor) ->
                if (valor.r != ResultadoEstado.NC) return@forEach
                if (hallazgos.any { it.rondaId == ronda.id && it.itemId == itemId }) return@forEach
                val built = nuevoHallazgo(seq, ronda, itemId) ?: return@forEach
                seq = built.first
                hallazgos.add(built.second)
                creados++
            }
        }
        if (creados == 0) return data to 0
        val next = data.copy(seq = seq, hallazgos = hallazgos)
        storage.save(next)
        return next to creados
    }

    suspend fun validarHallazgo(data: AppData, id: String): AppData? {
        if (data.hallazgos.none { it.id == id }) return null
        val next = data.copy(
            hallazgos = data.hallazgos.map { hallazgo ->
                if (hallazgo.id == id) hallazgo.copy(sugerido = false) else hallazgo
            },
        )
        storage.save(next)
        return next
    }

    suspend fun restaurarPropuesta(data: AppData, id: String): AppData? {
        val hallazgo = data.hallazgos.find { it.id == id } ?: return null
        val item = catalog.itemPorId(hallazgo.itemId) ?: return null
        val propuesta = item.prop ?: return null
        val next = data.copy(
            hallazgos = data.hallazgos.map { h ->
                if (h.id != id) return@map h
                h.copy(
                    criticidad = propuesta.criticidad,
                    que = propuesta.que,
                    porque = propuesta.porque,
                    quien = propuesta.quien,
                    como = propuesta.como,
                    cuando = sumarDias(h.fecha, propuesta.plazo),
                    sugerido = true,
                )
            },
        )
        storage.save(next)
        return next
    }

    suspend fun setHallazgoCampo(data: AppData, id: String, campo: String, valor: String): AppData {
        val next = data.copy(
            hallazgos = data.hallazgos.map { hallazgo ->
                if (hallazgo.id != id) return@map hallazgo
                val updated = when (campo) {
                    "desc" -> hallazgo.copy(desc = valor)
                    "que" -> hallazgo.copy(que = valor)
                    "porque" -> hallazgo.copy(porque = valor)
                    "donde" -> hallazgo.copy(donde = valor)
                    "quien" -> hallazgo.copy(quien = valor)
                    "cuando" -> hallazgo.copy(cuando = valor)
                    "como" -> hallazgo.copy(como = valor)
                    "criticidad" -> hallazgo.copy(
                        criticidad = when (valor) {
                            "Alta" -> Criticidad.Alta
                            "Baja" -> Criticidad.Baja
                            else -> Criticidad.Media
                        },
                    )
                    "estado" -> {
                        val estado = when (valor) {
                            "En ejecución" -> EstadoHallazgo.EnEjecucion
                            "Cerrado" -> EstadoHallazgo.Cerrado
                            else -> EstadoHallazgo.Abierto
                        }
                        val fechaCierre = if (estado == EstadoHallazgo.Cerrado && hallazgo.fechaCierre.isBlank()) {
                            hoy()
                        } else {
                            hallazgo.fechaCierre
                        }
                        hallazgo.copy(estado = estado, fechaCierre = fechaCierre)
                    }
                    "fechaCierre" -> hallazgo.copy(fechaCierre = valor)
                    "evidencia" -> hallazgo.copy(evidencia = valor)
                    else -> hallazgo
                }
                updated
            },
        )
        storage.save(next)
        return next
    }

    suspend fun borrarHallazgo(data: AppData, id: String): AppData {
        val next = data.copy(hallazgos = data.hallazgos.filter { it.id != id })
        storage.save(next)
        return next
    }

    suspend fun borrarTodo(): AppData {
        val next = AppData()
        storage.save(next)
        return next
    }

    suspend fun replaceData(data: AppData): AppData {
        storage.save(data)
        return data
    }
}
