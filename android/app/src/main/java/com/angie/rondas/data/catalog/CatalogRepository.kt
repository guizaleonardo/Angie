package com.angie.rondas.data.catalog

import android.content.Context
import com.angie.rondas.data.model.Bloque
import com.angie.rondas.data.model.Catalog
import com.angie.rondas.data.model.Item
import com.angie.rondas.data.model.TipoBloque
import kotlinx.serialization.json.Json

class CatalogRepository(context: Context) {
    private val json = Json { ignoreUnknownKeys = true }

    val catalog: Catalog by lazy {
        val raw = context.assets.open("catalog.json").bufferedReader().use { it.readText() }
        json.decodeFromString<Catalog>(raw)
    }

    val bloques: List<Bloque> get() = catalog.bloques

    val items: List<Item> get() = catalog.items

    val bloquesTransversales: List<Bloque> =
        catalog.bloques.filter { it.tipo == TipoBloque.TRANSVERSAL }

    val bloquesServicio: List<Bloque> =
        catalog.bloques.filter { it.tipo == TipoBloque.SERVICIO }

    private val codigosTransversales: Set<String> =
        bloquesTransversales.map { it.codigo }.toSet()

    private val nombreBloque: Map<String, String> =
        catalog.bloques.associate { it.codigo to it.nombre }

    fun nombreDeBloque(codigo: String): String = nombreBloque[codigo] ?: codigo

    fun itemPorId(id: String): Item? = items.find { it.id == id }

    fun itemsDeServicio(servicioCod: String): List<Item> =
        items.filter { codigosTransversales.contains(it.bloque) || it.bloque == servicioCod }
}
