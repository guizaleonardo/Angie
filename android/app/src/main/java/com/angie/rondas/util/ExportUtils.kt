package com.angie.rondas.util

import com.angie.rondas.data.catalog.CatalogRepository
import com.angie.rondas.data.model.AppData
import com.angie.rondas.data.model.FirmasActa
import com.angie.rondas.data.model.Ronda

object ExportUtils {
    fun toCsv(rows: List<List<String>>): String {
        val sb = StringBuilder()
        rows.forEachIndexed { index, row ->
            if (index > 0) sb.append('\n')
            sb.append(row.joinToString(",") { escapeCsv(it) })
        }
        return sb.toString()
    }

    private fun escapeCsv(value: String): String {
        val needsQuotes = value.contains(',') || value.contains('"') || value.contains('\n')
        val escaped = value.replace("\"", "\"\"")
        return if (needsQuotes) "\"$escaped\"" else escaped
    }

    fun csvRondas(rondas: List<Ronda>, catalog: CatalogRepository): String {
        val rows = mutableListOf(
            listOf(
                "ID ronda", "Fecha", "Periodo", "Servicio", "Líder", "Acompañantes",
                "Cumple", "No cumple", "No aplica", "Evaluados", "% cumplimiento", "Nivel", "Observación general",
            ),
        )
        rondas.forEach { ronda ->
            val c = conteo(ronda, catalog)
            rows.add(
                listOf(
                    ronda.id,
                    ronda.fecha,
                    periodo(ronda.fecha),
                    ronda.servicio,
                    ronda.lider,
                    ronda.acompanantes,
                    c.c.toString(),
                    c.nc.toString(),
                    c.na.toString(),
                    c.den.toString(),
                    c.pct?.let { String.format("%.1f", it * 100).replace('.', ',') }.orEmpty(),
                    nivel(c.pct).titulo,
                    ronda.obs,
                ),
            )
        }
        return toCsv(rows)
    }

    fun csvDetalle(rondas: List<Ronda>, catalog: CatalogRepository): String {
        val rows = mutableListOf(
            listOf(
                "ID ronda", "Fecha", "Servicio", "Bloque", "Nombre del bloque", "ID ítem",
                "Ítem verificable", "Resultado", "Observación", "Fuente de verificación", "Referencia normativa",
            ),
        )
        rondas.forEach { ronda ->
            catalog.itemsDeServicio(ronda.servicioCod).forEach { item ->
                val valor = ronda.resultados[item.id] ?: return@forEach
                rows.add(
                    listOf(
                        ronda.id,
                        ronda.fecha,
                        ronda.servicio,
                        item.bloque,
                        item.bloqueNombre,
                        item.id,
                        item.item,
                        valor.r.name,
                        valor.obs,
                        item.fuente,
                        item.referencia,
                    ),
                )
            }
        }
        return toCsv(rows)
    }

    fun csvHallazgos(data: AppData, catalog: CatalogRepository): String {
        val rows = mutableListOf(
            listOf(
                "ID plan", "ID ronda", "Fecha ronda", "Servicio", "ID ítem", "Ítem", "Hallazgo",
                "Criticidad", "QUÉ", "POR QUÉ", "DÓNDE", "QUIÉN", "CUÁNDO", "CÓMO", "Estado",
                "Fecha de cierre", "Evidencia", "Semáforo", "Origen del texto",
            ),
        )
        data.hallazgos.forEach { hallazgo ->
            val item = catalog.itemPorId(hallazgo.itemId)
            rows.add(
                listOf(
                    hallazgo.id,
                    hallazgo.rondaId,
                    hallazgo.fecha,
                    hallazgo.servicio,
                    hallazgo.itemId,
                    item?.item.orEmpty(),
                    hallazgo.desc,
                    criticidadLabel(hallazgo.criticidad),
                    hallazgo.que,
                    hallazgo.porque,
                    hallazgo.donde,
                    hallazgo.quien,
                    hallazgo.cuando,
                    hallazgo.como,
                    estadoHallazgoLabel(hallazgo.estado),
                    hallazgo.fechaCierre,
                    hallazgo.evidencia,
                    semaforoHallazgo(hallazgo),
                    if (hallazgo.sugerido) "Propuesta sin validar" else "Validado por el auditor",
                ),
            )
        }
        return toCsv(rows)
    }

    fun actaHtml(
        ronda: Ronda,
        hallazgos: List<com.angie.rondas.data.model.Hallazgo>,
        catalog: CatalogRepository,
        firmas: FirmasActa,
    ): String {
        val c = conteo(ronda, catalog)
        val nv = nivel(c.pct)
        val hs = hallazgos.filter { it.rondaId == ronda.id }
        val filas = catalog.bloques.mapNotNull { bloque ->
            val lista = catalog.itemsDeServicio(ronda.servicioCod).filter { it.bloque == bloque.codigo }
            if (lista.isEmpty()) return@mapNotNull null
            var cc = 0
            var nc = 0
            var na = 0
            lista.forEach { item ->
                when (ronda.resultados[item.id]?.r) {
                    com.angie.rondas.data.model.ResultadoEstado.C -> cc++
                    com.angie.rondas.data.model.ResultadoEstado.NC -> nc++
                    com.angie.rondas.data.model.ResultadoEstado.NA -> na++
                    else -> Unit
                }
            }
            if (cc + nc + na == 0) return@mapNotNull null
            val pctText = if (cc + nc > 0) String.format("%.1f %%", cc * 100.0 / (cc + nc)) else "—"
            "${bloque.codigo} · ${bloque.nombre}|$cc|$nc|$na|$pctText"
        }
        val ncs = catalog.itemsDeServicio(ronda.servicioCod).mapNotNull { item ->
            val valor = ronda.resultados[item.id] ?: return@mapNotNull null
            if (valor.r != com.angie.rondas.data.model.ResultadoEstado.NC) return@mapNotNull null
            Triple(item.id, item.item, valor.obs)
        }

        val filasHtml = filas.joinToString("") { row ->
            val parts = row.split("|")
            "<tr><td>${esc(parts[0])}</td><td>${parts[1]}</td><td>${parts[2]}</td><td>${parts[3]}</td><td>${esc(parts[4])}</td></tr>"
        }
        val ncsHtml = if (ncs.isEmpty()) {
            "<p>No se identificaron no conformidades en esta ronda.</p>"
        } else {
            ncs.joinToString("", "<table><thead><tr><th>Ítem</th><th>Descripción</th><th>Hallazgo</th></tr></thead><tbody>", "</tbody></table>") { (id, desc, obs) ->
                "<tr><td>${esc(id)}</td><td>${esc(desc)}</td><td>${esc(obs.ifBlank { "—" })}</td></tr>"
            }
        }
        val planesHtml = if (hs.isEmpty()) {
            "<p>Sin planes registrados para esta ronda.</p>"
        } else {
            hs.joinToString("") { x ->
                """
                <table style="margin-bottom:12px"><tbody>
                <tr><th style="width:120px">Plan</th><td>${esc(x.id)} · Ítem ${esc(x.itemId)} · Criticidad ${esc(criticidadLabel(x.criticidad))} · ${esc(estadoHallazgoLabel(x.estado))}${if (x.sugerido) " <b style=\"color:#B3261E\">— PROPUESTA SIN VALIDAR</b>" else ""}</td></tr>
                <tr><th>Hallazgo</th><td>${esc(x.desc.ifBlank { "—" })}</td></tr>
                <tr><th>¿Qué?</th><td>${esc(x.que.ifBlank { "—" })}</td></tr>
                <tr><th>¿Por qué?</th><td>${esc(x.porque.ifBlank { "—" })}</td></tr>
                <tr><th>¿Dónde?</th><td>${esc(x.donde.ifBlank { "—" })}</td></tr>
                <tr><th>¿Quién?</th><td>${esc(x.quien.ifBlank { "—" })}</td></tr>
                <tr><th>¿Cuándo?</th><td>${fmtF(x.cuando)}</td></tr>
                <tr><th>¿Cómo?</th><td>${esc(x.como.ifBlank { "—" })}</td></tr>
                </tbody></table>
                """.trimIndent()
            }
        }

        return """
            <!doctype html><html><head><meta charset="utf-8"><title>Acta ronda ${esc(ronda.id)}</title>
            <style>body{font-family:sans-serif;color:#102033;max-width:820px;margin:34px auto;padding:0 22px;font-size:13px;line-height:1.5}
            h1{font-size:17px;margin:0 0 2px}h2{font-size:13px;margin:22px 0 7px;border-bottom:2px solid #0E4A7A;padding-bottom:4px;color:#0E4A7A;text-transform:uppercase}
            table{width:100%;border-collapse:collapse;font-size:12px;margin-top:6px}
            th{background:#E4EEF6;text-align:left;padding:6px 7px;border:1px solid #C3CDD6}
            td{padding:6px 7px;border:1px solid #DCE3EA;vertical-align:top}
            .kv{display:grid;grid-template-columns:170px 1fr;gap:3px 10px;font-size:12.5px}
            .kv b{color:#4A5A6A;font-weight:600}
            .sub{color:#666;font-size:11.5px;margin-bottom:16px}
            .firma{margin-top:44px;display:grid;grid-template-columns:1fr 1fr;gap:44px}
            .firma .caja{text-align:center}
            .firma img{height:72px;width:auto;max-width:100%;object-fit:contain;display:block;margin:0 auto 8px}
            .firma .nombre{font-weight:600;font-size:12.5px;margin-bottom:6px}
            .firma .rol{border-top:1px solid #102033;padding-top:5px;font-size:11.5px}</style></head><body>
            <h1>Acta de ronda de seguridad del paciente</h1>
            <div class="sub">Guía Técnica BPSP (MinSalud) · Resolución 3100 de 2019</div>
            <div class="kv">
            <b>Identificación de la ronda</b><span>${esc(ronda.id)}</span>
            <b>Servicio auditado</b><span>${esc(ronda.servicio)}</span>
            <b>Fecha</b><span>${fmtF(ronda.fecha)}</span>
            <b>Líder de la ronda</b><span>${esc(ronda.lider.ifBlank { "—" })}</span>
            <b>Acompañantes</b><span>${esc(ronda.acompanantes.ifBlank { "—" })}</span>
            <b>Ítems verificados</b><span>${c.den} de ${c.total} (${c.na} no aplicables)</span>
            <b>Cumplimiento</b><span><b>${if (c.pct == null) "—" else pct(c.pct)}</b> — ${esc(nv.titulo)}</span>
            </div>
            <h2>Resultado por bloque</h2>
            <table><thead><tr><th>Bloque</th><th>C</th><th>NC</th><th>NA</th><th>% Cumplimiento</th></tr></thead><tbody>$filasHtml</tbody></table>
            <h2>No conformidades identificadas (${ncs.size})</h2>$ncsHtml
            <h2>Plan de mejoramiento 5W1H (${hs.size})</h2>$planesHtml
            <h2>Observación general</h2><p>${esc(ronda.obs.ifBlank { "—" })}</p>
            <div class="firma">
            <div class="caja">
            <img src="${firmas.seguridad.imagen}" alt="Firma del líder de seguridad del paciente">
            <div class="nombre">${esc(firmas.seguridad.nombre)}</div>
            <div class="rol">Líder de seguridad del paciente</div>
            </div>
            <div class="caja">
            <img src="${firmas.coordinador.imagen}" alt="Firma del líder o coordinador del servicio">
            <div class="nombre">${esc(firmas.coordinador.nombre)}</div>
            <div class="rol">Líder o coordinador del servicio</div>
            </div>
            </div>
            </body></html>
        """.trimIndent()
    }
}
