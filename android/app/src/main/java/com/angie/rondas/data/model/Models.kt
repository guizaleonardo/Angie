package com.angie.rondas.data.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
enum class TipoBloque {
    @SerialName("transversal") TRANSVERSAL,
    @SerialName("servicio") SERVICIO,
}

@Serializable
enum class ResultadoEstado {
    @SerialName("C") C,
    @SerialName("NC") NC,
    @SerialName("NA") NA,
}

@Serializable
enum class Criticidad {
    @SerialName("Alta") Alta,
    @SerialName("Media") Media,
    @SerialName("Baja") Baja,
}

@Serializable
enum class EstadoHallazgo {
    @SerialName("Abierto") Abierto,
    @SerialName("En ejecución") EnEjecucion,
    @SerialName("Cerrado") Cerrado,
}

@Serializable
data class Bloque(
    val codigo: String,
    val nombre: String,
    val tipo: TipoBloque,
)

@Serializable
data class PropuestaPlan(
    val criticidad: Criticidad,
    val plazo: Int,
    val quien: String,
    val que: String,
    val porque: String,
    val como: String,
)

@Serializable
data class Item(
    val id: String,
    val bloque: String,
    @SerialName("bloque_nombre") val bloqueNombre: String,
    val tipo: TipoBloque,
    val item: String,
    val referencia: String,
    val fuente: String,
    val nota: String = "",
    val prop: PropuestaPlan? = null,
)

@Serializable
data class ItemResultado(
    val r: ResultadoEstado,
    val obs: String = "",
)

@Serializable
data class Ronda(
    val id: String,
    val servicioCod: String,
    val servicio: String,
    val fecha: String,
    val lider: String = "",
    val acompanantes: String = "",
    val obs: String = "",
    val resultados: Map<String, ItemResultado> = emptyMap(),
)

@Serializable
data class Hallazgo(
    val id: String,
    val rondaId: String,
    val itemId: String,
    val servicioCod: String,
    val servicio: String,
    val bloque: String,
    val fecha: String,
    val desc: String = "",
    val criticidad: Criticidad = Criticidad.Media,
    val que: String = "",
    val porque: String = "",
    val donde: String = "",
    val quien: String = "",
    val cuando: String = "",
    val como: String = "",
    val estado: EstadoHallazgo = EstadoHallazgo.Abierto,
    val fechaCierre: String = "",
    val evidencia: String = "",
    val sugerido: Boolean = false,
)

@Serializable
data class AppData(
    val rondas: List<Ronda> = emptyList(),
    val hallazgos: List<Hallazgo> = emptyList(),
    val seq: Int = 0,
)

@Serializable
data class Catalog(
    val bloques: List<Bloque>,
    val items: List<Item>,
)

@Serializable
data class StoredAppData(
    val version: Int = 1,
    val rondas: List<Ronda> = emptyList(),
    val hallazgos: List<Hallazgo> = emptyList(),
    val seq: Int = 0,
)

data class Conteo(
    val c: Int,
    val nc: Int,
    val na: Int,
    val den: Int,
    val total: Int,
    val pct: Double?,
)

data class Agregado(
    val c: Int,
    val nc: Int,
    val na: Int,
    val pct: Double?,
)

data class Nivel(
    val titulo: String,
    val cssClass: String,
)

data class ResultadoBloque(
    val cod: String,
    val nom: String,
    val tipo: TipoBloque,
    val c: Int,
    val nc: Int,
    val na: Int,
    val pct: Double?,
)

data class PuntoTendencia(
    val k: String,
    val v: Double,
    val n: Int,
)

data class FirmaActa(
    val nombre: String,
    val imagen: String,
)

data class FirmasActa(
    val seguridad: FirmaActa,
    val coordinador: FirmaActa,
)

enum class FiltroHallazgos {
    Abiertos,
    Vencidos,
    Todos,
}
