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
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.angie.rondas.data.model.AppData
import com.angie.rondas.data.model.Criticidad
import com.angie.rondas.data.model.EstadoHallazgo
import com.angie.rondas.data.model.FiltroHallazgos
import com.angie.rondas.data.model.Hallazgo
import com.angie.rondas.data.model.ResultadoEstado
import com.angie.rondas.ui.components.AvisoBox
import com.angie.rondas.ui.components.EmptyState
import com.angie.rondas.ui.components.HintText
import com.angie.rondas.ui.components.KpiTile
import com.angie.rondas.ui.components.MonoBadge
import com.angie.rondas.ui.components.Pill
import com.angie.rondas.ui.components.RspCard
import com.angie.rondas.ui.theme.RspColors
import com.angie.rondas.util.criticidadLabel
import com.angie.rondas.util.estadoHallazgoLabel
import com.angie.rondas.util.fmtF
import com.angie.rondas.util.planesSinValidar
import com.angie.rondas.util.vencido
import com.angie.rondas.viewmodel.AppViewModel

@Composable
fun HallazgosScreen(
    viewModel: AppViewModel,
    data: AppData,
    confirmDeleteId: String?,
    confirmRestoreId: String?,
    onRequestDelete: (String) -> Unit,
    onRequestRestore: (String) -> Unit,
    onClearConfirm: () -> Unit,
) {
    var filtro by remember { mutableStateOf(FiltroHallazgos.Abiertos) }
    val catalog = viewModel.catalog
    val nc = data.rondas.sumOf { ronda -> ronda.resultados.values.count { it.r == ResultadoEstado.NC } }
    val sinPlan = nc - data.hallazgos.size
    val vencidos = data.hallazgos.count { vencido(it) }
    val sinValidar = planesSinValidar(data.hallazgos)

    val lista = remember(data.hallazgos, filtro) {
        var items = data.hallazgos
        items = when (filtro) {
            FiltroHallazgos.Abiertos -> items.filter { it.estado != EstadoHallazgo.Cerrado }
            FiltroHallazgos.Vencidos -> items.filter { vencido(it) }
            FiltroHallazgos.Todos -> items
        }
        items.sortedWith(
            compareByDescending<Hallazgo> { vencido(it) }
                .thenBy { when (it.criticidad) { Criticidad.Alta -> 0; Criticidad.Media -> 1; Criticidad.Baja -> 2 } }
                .thenBy { it.cuando.ifBlank { "z" } },
        )
    }

    Column(Modifier.verticalScroll(rememberScrollState())) {
        RspCard {
            Text("Planes de mejoramiento 5W1H", style = androidx.compose.material3.MaterialTheme.typography.titleMedium)
            HintText("Cada no conformidad debe tener acción, responsable y fecha.")
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.fillMaxWidth()) {
                    KpiTile("${data.hallazgos.size}", "Planes registrados")
                    KpiTile("${data.hallazgos.count { it.estado == EstadoHallazgo.Abierto }}", "Abiertos")
                }
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.fillMaxWidth()) {
                    KpiTile("${data.hallazgos.count { it.estado == EstadoHallazgo.EnEjecucion }}", "En ejecución")
                    KpiTile("${data.hallazgos.count { it.estado == EstadoHallazgo.Cerrado }}", "Cerrados")
                }
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.fillMaxWidth()) {
                    KpiTile("$vencidos", "Vencidos", risk = vencidos > 0)
                    KpiTile("$sinValidar", "Sin validar", risk = sinValidar > 0)
                }
            }
            if (sinPlan > 0) {
                AvisoBox(
                    "Hay $sinPlan no conformidad(es) sin plan de mejoramiento.",
                    modifier = Modifier.padding(top = 12.dp),
                )
                OutlinedButton(onClick = { viewModel.generarPendientes() }, modifier = Modifier.padding(top = 8.dp)) {
                    Text("Generar los planes faltantes")
                }
            }
            if (sinValidar > 0) {
                AvisoBox(
                    "$sinValidar plan(es) siguen como propuesta automática. Ajuste la causa, confirme responsable y fecha, y valide cada plan.",
                    modifier = Modifier.padding(top = 12.dp),
                )
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(top = 12.dp)) {
                FilterChip("Pendientes", filtro == FiltroHallazgos.Abiertos) { filtro = FiltroHallazgos.Abiertos }
                FilterChip("Vencidos", filtro == FiltroHallazgos.Vencidos) { filtro = FiltroHallazgos.Vencidos }
                FilterChip("Todos", filtro == FiltroHallazgos.Todos) { filtro = FiltroHallazgos.Todos }
            }
        }

        if (lista.isEmpty()) {
            RspCard {
                EmptyState(
                    title = "Nada por aquí",
                    subtitle = if (data.hallazgos.isEmpty()) {
                        "Los planes aparecen cuando marca un ítem como NC."
                    } else {
                        "Ningún plan cumple este filtro."
                    },
                )
            }
        } else {
            lista.forEach { hallazgo ->
                HallazgoCard(
                    hallazgo = hallazgo,
                    itemText = catalog.itemPorId(hallazgo.itemId)?.item.orEmpty(),
                    confirmingDelete = confirmDeleteId == hallazgo.id,
                    confirmingRestore = confirmRestoreId == hallazgo.id,
                    onChange = { campo, valor -> viewModel.setHallazgoCampo(hallazgo.id, campo, valor) },
                    onDelete = { onRequestDelete(hallazgo.id) },
                    onConfirmDelete = {
                        viewModel.borrarHallazgo(hallazgo.id) {}
                        onClearConfirm()
                    },
                    onValidar = { viewModel.validarHallazgo(hallazgo.id) },
                    onRestaurar = { onRequestRestore(hallazgo.id) },
                    onConfirmRestore = {
                        viewModel.restaurarPropuesta(hallazgo.id) {}
                        onClearConfirm()
                    },
                )
            }
        }
    }
}

@Composable
private fun FilterChip(label: String, selected: Boolean, onClick: () -> Unit) {
    if (selected) {
        Button(onClick = onClick) { Text(label) }
    } else {
        OutlinedButton(onClick = onClick) { Text(label) }
    }
}

@Composable
private fun HallazgoCard(
    hallazgo: Hallazgo,
    itemText: String,
    confirmingDelete: Boolean,
    confirmingRestore: Boolean,
    onChange: (String, String) -> Unit,
    onDelete: () -> Unit,
    onConfirmDelete: () -> Unit,
    onValidar: () -> Unit,
    onRestaurar: () -> Unit,
    onConfirmRestore: () -> Unit,
) {
    val vence = vencido(hallazgo)
    RspCard {
        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            MonoBadge(hallazgo.id)
            Pill(hallazgo.itemId, "p-mk")
            Pill("Criticidad ${criticidadLabel(hallazgo.criticidad)}", when (hallazgo.criticidad) {
                Criticidad.Alta -> "p-no"; Criticidad.Media -> "p-al"; Criticidad.Baja -> "p-na"
            })
            Pill(estadoHallazgoLabel(hallazgo.estado), when (hallazgo.estado) {
                EstadoHallazgo.Cerrado -> "p-si"; EstadoHallazgo.EnEjecucion -> "p-mk"; EstadoHallazgo.Abierto -> "p-na"
            })
            if (vence) Pill("Vencido", "p-no")
            if (hallazgo.sugerido) Pill("Propuesta sin validar", "p-al")
        }
        Text(itemText, fontWeight = FontWeight.Medium, modifier = Modifier.padding(top = 8.dp))
        Text(
            "${hallazgo.servicio} · Ronda ${hallazgo.rondaId} · ${fmtF(hallazgo.fecha)}",
            color = RspColors.Tinta3,
            style = androidx.compose.material3.MaterialTheme.typography.bodySmall,
        )
        if (hallazgo.sugerido) {
            AvisoBox("Texto generado por la herramienta. Reemplace ¿POR QUÉ? por la causa confirmada en la ronda.", modifier = Modifier.padding(top = 8.dp))
        }
        Column(verticalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(top = 12.dp)) {
            Field("Hallazgo encontrado", hallazgo.desc, multiline = true) { onChange("desc", it) }
            Field("¿Qué? Acción de mejora", hallazgo.que, multiline = true) { onChange("que", it) }
            Field("¿Por qué? Causa confirmada", hallazgo.porque, multiline = true) { onChange("porque", it) }
            Field("¿Dónde?", hallazgo.donde) { onChange("donde", it) }
            Field("¿Quién? Responsable", hallazgo.quien) { onChange("quien", it) }
            Field("¿Cuándo? Fecha compromiso", hallazgo.cuando) { onChange("cuando", it) }
            Field("¿Cómo? Método y recursos", hallazgo.como, multiline = true) { onChange("como", it) }
            Field("Evidencia de cierre", hallazgo.evidencia, multiline = true) { onChange("evidencia", it) }
            EstadoDropdown(hallazgo.estado) { onChange("estado", estadoHallazgoLabel(it)) }
            CriticidadDropdown(hallazgo.criticidad) { onChange("criticidad", criticidadLabel(it)) }
            Field("Fecha de cierre", hallazgo.fechaCierre) { onChange("fechaCierre", it) }
        }
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(top = 12.dp)) {
            if (hallazgo.sugerido) {
                Button(onClick = onValidar) { Text("Validar plan") }
            } else if (confirmingRestore) {
                Button(onClick = onConfirmRestore) { Text("Confirmar restaurar") }
            } else {
                OutlinedButton(onClick = onRestaurar) { Text("Volver a propuesta") }
            }
            if (confirmingDelete) {
                Button(onClick = onConfirmDelete, colors = ButtonDefaults.buttonColors(containerColor = RspColors.No)) {
                    Text("Confirmar eliminar")
                }
            } else {
                OutlinedButton(onClick = onDelete) { Text("Eliminar") }
            }
        }
    }
}

@Composable
private fun Field(label: String, value: String, multiline: Boolean = false, onCommit: (String) -> Unit) {
    var text by remember(value) { mutableStateOf(value) }
    OutlinedTextField(
        value = text,
        onValueChange = {
            text = it
            onCommit(it)
        },
        label = { Text(label) },
        modifier = Modifier.fillMaxWidth(),
        maxLines = if (multiline) 5 else 1,
        singleLine = !multiline,
    )
}

@Composable
private fun EstadoDropdown(selected: EstadoHallazgo, onSelect: (EstadoHallazgo) -> Unit) {
    var expanded by remember { mutableStateOf(false) }
    Column {
        Text("Estado", style = androidx.compose.material3.MaterialTheme.typography.labelSmall)
        OutlinedButton(onClick = { expanded = !expanded }, modifier = Modifier.fillMaxWidth()) {
            Text(estadoHallazgoLabel(selected))
        }
        if (expanded) {
            EstadoHallazgo.values().forEach { estado ->
                TextButton(onClick = { onSelect(estado); expanded = false }, modifier = Modifier.fillMaxWidth()) {
                    Text(estadoHallazgoLabel(estado))
                }
            }
        }
    }
}

@Composable
private fun CriticidadDropdown(selected: Criticidad, onSelect: (Criticidad) -> Unit) {
    var expanded by remember { mutableStateOf(false) }
    Column {
        Text("Criticidad", style = androidx.compose.material3.MaterialTheme.typography.labelSmall)
        OutlinedButton(onClick = { expanded = !expanded }, modifier = Modifier.fillMaxWidth()) {
            Text(criticidadLabel(selected))
        }
        if (expanded) {
            Criticidad.values().forEach { crit ->
                TextButton(onClick = { onSelect(crit); expanded = false }, modifier = Modifier.fillMaxWidth()) {
                    Text(criticidadLabel(crit))
                }
            }
        }
    }
}
