package com.angie.rondas.util

import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.Locale

private val isoDate = DateTimeFormatter.ISO_LOCAL_DATE

fun hoy(): String = LocalDate.now().format(isoDate)

fun periodo(fecha: String?): String = (fecha ?: "").take(7)

fun fmtF(fecha: String?): String {
    if (fecha.isNullOrBlank()) return "—"
    return try {
        val date = LocalDate.parse(fecha, isoDate)
        date.format(DateTimeFormatter.ofPattern("dd/MM/yyyy", Locale("es", "CO")))
    } catch (_: Exception) {
        fecha.split("-").reversed().joinToString("/")
    }
}

fun pct(valor: Double?): String {
    if (valor == null) return "—"
    return String.format(Locale("es", "CO"), "%.1f %%", valor * 100).replace('.', ',')
}

fun nextPrefixedId(seq: Int, prefix: String): Pair<Int, String> {
    val next = (seq.takeIf { it > 0 } ?: 0) + 1
    return next to "$prefix-${next.toString().padStart(3, '0')}"
}

fun sumarDias(fecha: String?, dias: Int): String {
    if (fecha.isNullOrBlank()) return ""
    return try {
        LocalDate.parse(fecha, isoDate).plusDays(dias.toLong()).format(isoDate)
    } catch (_: Exception) {
        ""
    }
}

fun esc(valor: Any?): String {
    val text = valor?.toString() ?: ""
    return text
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("\"", "&quot;")
        .replace("'", "&#39;")
}

fun estadoHallazgoLabel(estado: com.angie.rondas.data.model.EstadoHallazgo): String = when (estado) {
    com.angie.rondas.data.model.EstadoHallazgo.Abierto -> "Abierto"
    com.angie.rondas.data.model.EstadoHallazgo.EnEjecucion -> "En ejecución"
    com.angie.rondas.data.model.EstadoHallazgo.Cerrado -> "Cerrado"
}

fun criticidadLabel(c: com.angie.rondas.data.model.Criticidad): String = when (c) {
    com.angie.rondas.data.model.Criticidad.Alta -> "Alta"
    com.angie.rondas.data.model.Criticidad.Media -> "Media"
    com.angie.rondas.data.model.Criticidad.Baja -> "Baja"
}

fun resultadoLabel(r: com.angie.rondas.data.model.ResultadoEstado): String = r.name
