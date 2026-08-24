package com.angie.rondas.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.angie.rondas.data.model.AppData
import com.angie.rondas.data.model.Criticidad
import com.angie.rondas.data.model.EstadoHallazgo
import com.angie.rondas.ui.components.EmptyState
import com.angie.rondas.ui.components.HintText
import com.angie.rondas.ui.components.KpiTile
import com.angie.rondas.ui.components.MonoBadge
import com.angie.rondas.ui.components.Pill
import com.angie.rondas.ui.components.ProgressBar
import com.angie.rondas.ui.components.RspCard
import com.angie.rondas.ui.theme.RspColors
import com.angie.rondas.util.agregado
import com.angie.rondas.util.conteo
import com.angie.rondas.util.nivel
import com.angie.rondas.util.noConformidadesRepetidas
import com.angie.rondas.util.planesAbiertos
import com.angie.rondas.util.pct as formatPct
import com.angie.rondas.util.resultadosPorBloque
import com.angie.rondas.util.tendenciaPorPeriodo
import com.angie.rondas.util.vencido
import com.angie.rondas.viewmodel.AppViewModel

@Composable
fun DashboardScreen(viewModel: AppViewModel, data: AppData, onCreateRonda: () -> Unit) {
    val catalog = viewModel.catalog
    val cerradas = remember(data.rondas) { data.rondas.filter { conteo(it, catalog).den > 0 } }
    val global = remember(data.rondas) { agregado(data.rondas) }
    val nv = nivel(global.pct)
    val venc = data.hallazgos.count { vencido(it) }
    val alta = data.hallazgos.count { it.criticidad == Criticidad.Alta && it.estado != EstadoHallazgo.Cerrado }
    val tendencia = remember(data.rondas) { tendenciaPorPeriodo(data.rondas, catalog) }
    val repetidas = remember(data.rondas) { noConformidadesRepetidas(data.rondas, catalog) }

    Column(Modifier.verticalScroll(rememberScrollState())) {
        if (cerradas.isEmpty()) {
            RspCard {
                EmptyState(
                    title = "Todavía no hay rondas con resultados",
                    subtitle = "Cree la primera ronda y márquele resultados: el tablero se arma solo.",
                ) {
                    Button(onClick = onCreateRonda) { Text("Crear la primera ronda") }
                }
            }
        } else {
        RspCard {
            Text("Resumen", style = androidx.compose.material3.MaterialTheme.typography.titleMedium)
            HintText("El porcentaje es C ÷ (C + NC). Los ítems marcados NA quedan fuera del denominador.")
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.fillMaxWidth()) {
                    KpiTile(formatPct(global.pct), "Cumplimiento global", accent = true)
                    KpiTile("${cerradas.size}", "Rondas con resultados")
                }
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.fillMaxWidth()) {
                    KpiTile("${global.c + global.nc}", "Ítems verificados")
                    KpiTile("${global.nc}", "No conformidades")
                }
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.fillMaxWidth()) {
                    KpiTile("${planesAbiertos(data.hallazgos)}", "Planes abiertos")
                    KpiTile("$venc", "Planes vencidos", risk = venc > 0)
                }
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.fillMaxWidth()) {
                    KpiTile("$alta", "Criticidad alta abierta", risk = alta > 0)
                    KpiTile("${global.na}", "Ítems no aplicables")
                }
            }
            Pill("Nivel institucional: ${nv.titulo}", nv.cssClass)
        }

        RspCard {
            Text("Cumplimiento por servicio", style = androidx.compose.material3.MaterialTheme.typography.titleMedium)
            HintText("Ordenado de menor a mayor: lo primero de la lista es lo que necesita intervención.")
            catalog.bloquesServicio.map { servicio ->
                val rs = data.rondas.filter { it.servicioCod == servicio.codigo && conteo(it, catalog).den > 0 }
                val a = agregado(data.rondas) { it.servicioCod == servicio.codigo }
                val ha = data.hallazgos.count { it.servicioCod == servicio.codigo && it.estado != EstadoHallazgo.Cerrado }
                servicio to Triple(rs.size, a, ha)
            }.sortedWith(compareBy({ it.second.second.pct == null }, { it.second.second.pct ?: 0.0 }))
                .forEach { (servicio, stats) ->
                    val (rondasCount, agg, planes) = stats
                    val nivelFila = nivel(agg.pct)
                    Column(
                        Modifier
                            .fillMaxWidth()
                            .padding(vertical = 8.dp),
                    ) {
                        Text(servicio.nombre, fontWeight = androidx.compose.ui.text.font.FontWeight.Bold)
                        Text("Rondas: $rondasCount · C:${agg.c} NC:${agg.nc} NA:${agg.na}", color = RspColors.Tinta3, style = androidx.compose.material3.MaterialTheme.typography.bodySmall)
                        ProgressBar(agg.pct, Modifier.padding(vertical = 4.dp))
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            Pill("${formatPct(agg.pct)} · ${nivelFila.titulo}", nivelFila.cssClass)
                            if (planes > 0) Pill("Planes abiertos: $planes", "p-al")
                        }
                    }
                }
        }

        RspCard {
            Text("Cumplimiento por bloque", style = androidx.compose.material3.MaterialTheme.typography.titleMedium)
            HintText("Los bloques A–E son transversales; F–P corresponden al servicio auditado.")
            resultadosPorBloque(data.rondas, catalog.bloques, catalog).forEach { bloque ->
                Column(Modifier.padding(vertical = 8.dp)) {
                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        MonoBadge(bloque.cod)
                        Text(bloque.nom, modifier = Modifier.weight(1f))
                    }
                    Text("C:${bloque.c} NC:${bloque.nc} NA:${bloque.na}", color = RspColors.Tinta3, style = androidx.compose.material3.MaterialTheme.typography.bodySmall)
                    ProgressBar(bloque.pct, Modifier.padding(top = 4.dp))
                }
            }
        }

        if (tendencia.isNotEmpty()) {
            RspCard {
                Text("Tendencia por periodo", style = androidx.compose.material3.MaterialTheme.typography.titleMedium)
                HintText("Cumplimiento consolidado de todas las rondas de cada mes.")
                tendencia.forEach { punto ->
                    Column(Modifier.padding(vertical = 6.dp)) {
                        Text(punto.k, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold)
                        ProgressBar(punto.v)
                        Text("${formatPct(punto.v)} · ${punto.n} ronda(s)", color = RspColors.Tinta3, style = androidx.compose.material3.MaterialTheme.typography.bodySmall)
                    }
                }
            }
        }

        if (repetidas.isNotEmpty()) {
            RspCard {
                Text("No conformidades más repetidas", style = androidx.compose.material3.MaterialTheme.typography.titleMedium)
                HintText("Reincidencia entre rondas.")
                repetidas.forEach { (id, veces, item) ->
                    Column(Modifier.padding(vertical = 8.dp)) {
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            MonoBadge(id)
                            Text("$veces veces", color = RspColors.No, fontWeight = androidx.compose.ui.text.font.FontWeight.Bold)
                        }
                        Text(item, style = androidx.compose.material3.MaterialTheme.typography.bodySmall)
                    }
                }
            }
        }
        }
    }
}
