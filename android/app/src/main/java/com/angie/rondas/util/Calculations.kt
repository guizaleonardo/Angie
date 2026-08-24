package com.angie.rondas.util

import com.angie.rondas.data.catalog.CatalogRepository
import com.angie.rondas.data.model.Agregado
import com.angie.rondas.data.model.Bloque
import com.angie.rondas.data.model.Conteo
import com.angie.rondas.data.model.EstadoHallazgo
import com.angie.rondas.data.model.Hallazgo
import com.angie.rondas.data.model.Item
import com.angie.rondas.data.model.Nivel
import com.angie.rondas.data.model.PuntoTendencia
import com.angie.rondas.data.model.ResultadoBloque
import com.angie.rondas.data.model.ResultadoEstado
import com.angie.rondas.data.model.Ronda

fun conteo(ronda: Ronda, catalog: CatalogRepository, items: List<Item>? = null): Conteo {
    var c = 0
    var nc = 0
    var na = 0
    ronda.resultados.values.forEach { valor ->
        when (valor.r) {
            ResultadoEstado.C -> c++
            ResultadoEstado.NC -> nc++
            ResultadoEstado.NA -> na++
        }
    }
    val lista = items ?: catalog.itemsDeServicio(ronda.servicioCod)
    val den = c + nc
    val total = lista.size
    val pct = if (den > 0) c.toDouble() / den else null
    return Conteo(c, nc, na, den, total, pct)
}

fun nivel(p: Double?): Nivel = when {
    p == null -> Nivel("Sin datos", "p-na")
    p >= 0.9 -> Nivel("Óptimo", "p-si")
    p >= 0.75 -> Nivel("Aceptable", "p-mk")
    p >= 0.6 -> Nivel("Deficiente", "p-al")
    else -> Nivel("Crítico", "p-no")
}

fun agregado(rondas: List<Ronda>, filtro: (Ronda) -> Boolean = { true }): Agregado {
    var c = 0
    var nc = 0
    var na = 0
    rondas.filter(filtro).forEach { ronda ->
        ronda.resultados.values.forEach { valor ->
            when (valor.r) {
                ResultadoEstado.C -> c++
                ResultadoEstado.NC -> nc++
                ResultadoEstado.NA -> na++
            }
        }
    }
    val pct = if (c + nc > 0) c.toDouble() / (c + nc) else null
    return Agregado(c, nc, na, pct)
}

fun vencido(hallazgo: Hallazgo, fechaHoy: String = hoy()): Boolean =
    hallazgo.estado != EstadoHallazgo.Cerrado &&
        hallazgo.cuando.isNotBlank() &&
        hallazgo.cuando < fechaHoy

fun resultadosPorBloque(
    rondas: List<Ronda>,
    bloques: List<Bloque>,
    catalog: CatalogRepository,
): List<ResultadoBloque> = bloques.mapNotNull { bloque ->
    var c = 0
    var nc = 0
    var na = 0
    rondas.forEach { ronda ->
        ronda.resultados.forEach { (id, valor) ->
            val item = catalog.itemPorId(id) ?: return@forEach
            if (item.bloque != bloque.codigo) return@forEach
            when (valor.r) {
                ResultadoEstado.C -> c++
                ResultadoEstado.NC -> nc++
                ResultadoEstado.NA -> na++
            }
        }
    }
    if (c + nc + na == 0) return@mapNotNull null
    ResultadoBloque(
        cod = bloque.codigo,
        nom = bloque.nombre,
        tipo = bloque.tipo,
        c = c,
        nc = nc,
        na = na,
        pct = if (c + nc > 0) c.toDouble() / (c + nc) else null,
    )
}

fun tendenciaPorPeriodo(rondas: List<Ronda>, catalog: CatalogRepository): List<PuntoTendencia> {
    val per = linkedMapOf<String, Triple<Int, Int, Int>>()
    rondas.forEach { ronda ->
        val key = periodo(ronda.fecha)
        if (key.isBlank()) return@forEach
        val c = conteo(ronda, catalog)
        if (c.den == 0) return@forEach
        val actual = per.getOrDefault(key, Triple(0, 0, 0))
        per[key] = Triple(actual.first + c.c, actual.second + c.nc, actual.third + 1)
    }
    return per.entries.sortedBy { it.key }.map { (key, value) ->
        PuntoTendencia(
            k = key,
            v = value.first.toDouble() / (value.first + value.second),
            n = value.third,
        )
    }
}

fun noConformidadesRepetidas(
    rondas: List<Ronda>,
    catalog: CatalogRepository,
    limite: Int = 8,
): List<Triple<String, Int, String>> {
    val rep = mutableMapOf<String, Int>()
    rondas.forEach { ronda ->
        ronda.resultados.forEach { (id, valor) ->
            if (valor.r == ResultadoEstado.NC) {
                rep[id] = (rep[id] ?: 0) + 1
            }
        }
    }
    return rep.entries
        .sortedByDescending { it.value }
        .take(limite)
        .map { (id, veces) ->
            Triple(id, veces, catalog.itemPorId(id)?.item.orEmpty())
        }
}

fun planesAbiertos(hallazgos: List<Hallazgo>): Int =
    hallazgos.count { it.estado != EstadoHallazgo.Cerrado }

fun planesSinValidar(hallazgos: List<Hallazgo>): Int =
    hallazgos.count { it.sugerido && it.estado != EstadoHallazgo.Cerrado }

fun semaforoHallazgo(hallazgo: Hallazgo): String = when {
    hallazgo.estado == EstadoHallazgo.Cerrado -> "Cerrado"
    vencido(hallazgo) -> "Vencido"
    hallazgo.cuando.isNotBlank() -> "En plazo"
    else -> "Sin fecha"
}
