package com.angie.rondas.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.angie.rondas.data.model.AppData
import com.angie.rondas.data.model.Bloque
import com.angie.rondas.data.model.FirmasActa
import com.angie.rondas.data.model.Item
import com.angie.rondas.data.model.ResultadoEstado
import com.angie.rondas.data.model.Ronda
import com.angie.rondas.data.model.TipoBloque
import com.angie.rondas.ui.components.EmptyState
import com.angie.rondas.ui.components.HintText
import com.angie.rondas.ui.components.MonoBadge
import com.angie.rondas.ui.components.Pill
import com.angie.rondas.ui.components.GenerarActaButton
import com.angie.rondas.ui.components.RspCard
import com.angie.rondas.ui.theme.RspColors
import com.angie.rondas.ui.theme.resultadoColor
import com.angie.rondas.util.conteo
import com.angie.rondas.util.fmtF
import com.angie.rondas.util.nivel
import com.angie.rondas.util.pct as formatPct
import com.angie.rondas.viewmodel.AppViewModel

@Composable
fun AplicarScreen(
    viewModel: AppViewModel,
    data: AppData,
    rondaId: String?,
    onSelectRonda: (String) -> Unit,
    onHallazgos: () -> Unit,
    onRondas: () -> Unit,
    onExportActa: (String, FirmasActa) -> Unit,
    confirmAction: String?,
    onConfirmAction: (String) -> Unit,
) {
    val catalog = viewModel.catalog
    val ronda = data.rondas.find { it.id == rondaId }
        ?: data.rondas.lastOrNull()

    LaunchedEffect(ronda?.id, rondaId) {
        if (ronda != null && rondaId != ronda.id) onSelectRonda(ronda.id)
    }

    if (ronda == null) {
        RspCard {
            EmptyState(title = "No hay ninguna ronda abierta", subtitle = "Programe una ronda para empezar a verificar.") {
                Button(onClick = onRondas) { Text("Ir a Rondas") }
            }
        }
    } else {
    val items = remember(ronda.servicioCod) { catalog.itemsDeServicio(ronda.servicioCod) }
    val c = conteo(ronda, catalog, items)
    val nv = nivel(c.pct)

    Column(Modifier.verticalScroll(rememberScrollState())) {
        RspCard {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.fillMaxWidth()) {
                MonoBadge(ronda.id)
                Column(Modifier.weight(1f)) {
                    Text(ronda.servicio, fontWeight = FontWeight.Bold)
                    Text(fmtF(ronda.fecha), color = RspColors.Tinta3, style = androidx.compose.material3.MaterialTheme.typography.bodySmall)
                }
            }
            Row(horizontalArrangement = Arrangement.spacedBy(6.dp), modifier = Modifier.padding(top = 8.dp)) {
                Pill("${if (c.pct != null) formatPct(c.pct) else "Sin marcar"} · ${nv.titulo}", nv.cssClass)
                Pill("${c.den + c.na} de ${c.total}", "p-na")
            }
            if (data.rondas.size > 1) {
                RondaSelector(data.rondas, ronda.id, onSelectRonda)
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(top = 8.dp)) {
                if (confirmAction == "marcarC") {
                    Button(onClick = {
                        viewModel.marcarTodo(ronda.id, ResultadoEstado.C) {}
                        onConfirmAction("")
                    }) { Text("Confirmar marcar todo C") }
                } else {
                    OutlinedButton(onClick = { onConfirmAction("marcarC") }) { Text("Marcar todo C") }
                }
                if (confirmAction == "limpiar") {
                    Button(
                        onClick = {
                            viewModel.limpiarResultados(ronda.id) {}
                            onConfirmAction("")
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = RspColors.No),
                    ) { Text("Confirmar limpiar") }
                } else {
                    OutlinedButton(onClick = { onConfirmAction("limpiar") }) { Text("Limpiar") }
                }
            }
        }

        catalog.bloques.forEach { bloque ->
            val bloqueItems = items.filter { it.bloque == bloque.codigo }
            if (bloqueItems.isNotEmpty()) {
                BloqueSection(
                    bloque = bloque,
                    items = bloqueItems,
                    ronda = ronda,
                    tieneHallazgo = { itemId -> viewModel.tieneHallazgo(ronda.id, itemId) },
                    onMarcar = { itemId, estado -> viewModel.marcar(ronda.id, itemId, estado) },
                    onObservacion = { itemId, obs -> viewModel.setObservacionItem(ronda.id, itemId, obs) },
                    onCrearPlan = { itemId ->
                        viewModel.crearHallazgo(ronda.id, itemId, onHallazgos)
                    },
                )
            }
        }

        RspCard {
            var obs by remember(ronda.obs) { mutableStateOf(ronda.obs) }
            OutlinedTextField(
                value = obs,
                onValueChange = { obs = it },
                label = { Text("Observación general de la ronda") },
                placeholder = { Text("Conclusión de la ronda, compromisos acordados en sitio.") },
                modifier = Modifier.fillMaxWidth(),
                maxLines = 5,
                singleLine = false,
            )
            LaunchedEffect(obs) {
                if (obs != ronda.obs) {
                    kotlinx.coroutines.delay(350)
                    viewModel.setObservacionRonda(ronda.id, obs)
                }
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(top = 12.dp)) {
                OutlinedButton(onClick = onHallazgos) { Text("Ir a planes") }
                GenerarActaButton(
                    ronda = ronda,
                    onExport = { firmas -> onExportActa(ronda.id, firmas) },
                )
            }
        }
    }
    }
}

@Composable
private fun RondaSelector(rondas: List<Ronda>, selectedId: String, onSelect: (String) -> Unit) {
    var expanded by remember { mutableStateOf(false) }
    val selected = rondas.find { it.id == selectedId }
    Column(Modifier.padding(top = 8.dp)) {
        OutlinedButton(onClick = { expanded = !expanded }, modifier = Modifier.fillMaxWidth()) {
            Text(selected?.let { "${it.id} · ${it.servicio} · ${fmtF(it.fecha)}" } ?: "Seleccionar ronda")
        }
        if (expanded) {
            rondas.forEach { ronda ->
                TextButton(
                    onClick = {
                        onSelect(ronda.id)
                        expanded = false
                    },
                    modifier = Modifier.fillMaxWidth(),
                ) { Text("${ronda.id} · ${ronda.servicio}") }
            }
        }
    }
}

@Composable
private fun BloqueSection(
    bloque: Bloque,
    items: List<Item>,
    ronda: Ronda,
    tieneHallazgo: (String) -> Boolean,
    onMarcar: (String, ResultadoEstado) -> Unit,
    onObservacion: (String, String) -> Unit,
    onCrearPlan: (String) -> Unit,
) {
    RspCard {
        Text(
            "${bloque.codigo} · ${bloque.nombre}",
            style = androidx.compose.material3.MaterialTheme.typography.titleMedium,
        )
        HintText(
            if (bloque.tipo == TipoBloque.TRANSVERSAL) "Bloque transversal" else "Bloque del servicio auditado",
        )
        items.forEach { item ->
            ItemVerificacionCard(
                item = item,
                resultado = ronda.resultados[item.id],
                tieneHallazgo = tieneHallazgo(item.id),
                onMarcar = { estado -> onMarcar(item.id, estado) },
                onObservacion = { obs -> onObservacion(item.id, obs) },
                onCrearPlan = { onCrearPlan(item.id) },
            )
        }
    }
}

@Composable
private fun ItemVerificacionCard(
    item: Item,
    resultado: com.angie.rondas.data.model.ItemResultado?,
    tieneHallazgo: Boolean,
    onMarcar: (ResultadoEstado) -> Unit,
    onObservacion: (String) -> Unit,
    onCrearPlan: () -> Unit,
) {
    var obs by remember(resultado?.obs) { mutableStateOf(resultado?.obs.orEmpty()) }
    Column(
        Modifier
            .fillMaxWidth()
            .padding(vertical = 10.dp),
    ) {
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            MonoBadge(item.id)
            Text(item.item, modifier = Modifier.weight(1f))
        }
        Text(item.referencia, color = RspColors.Tinta3, style = androidx.compose.material3.MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 4.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(6.dp), modifier = Modifier.padding(top = 8.dp)) {
            ResultadoEstado.values().forEach { estado ->
                val selected = resultado?.r == estado
                Button(
                    onClick = { onMarcar(estado) },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (selected) resultadoColor(estado) else RspColors.Papel,
                        contentColor = if (selected) RspColors.Sup else RspColors.Tinta,
                    ),
                    modifier = Modifier.weight(1f),
                ) { Text(estado.name) }
            }
        }
        if (resultado != null) {
            OutlinedTextField(
                value = obs,
                onValueChange = {
                    obs = it
                    onObservacion(it)
                },
                label = { Text("Observación") },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 8.dp),
                maxLines = 3,
                singleLine = false,
            )
        }
        if (resultado?.r == ResultadoEstado.NC) {
            Row(modifier = Modifier.padding(top = 8.dp)) {
                if (tieneHallazgo) {
                    Pill("Plan registrado", "p-si")
                } else {
                    OutlinedButton(onClick = onCrearPlan) { Text("Crear plan 5W1H") }
                }
            }
        }
    }
}
