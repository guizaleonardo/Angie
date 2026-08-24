package com.angie.rondas.ui.screens

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
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
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.angie.rondas.data.model.AppData
import com.angie.rondas.ui.components.GenerarActaButton
import com.angie.rondas.ui.components.HintText
import com.angie.rondas.ui.components.RspCard
import com.angie.rondas.ui.theme.RspColors
import com.angie.rondas.util.fmtF
import com.angie.rondas.viewmodel.AppViewModel

@Composable
fun DatosScreen(
    viewModel: AppViewModel,
    data: AppData,
    confirmRestore: Boolean,
    confirmDeleteAll: Int,
    onRequestRestore: () -> Unit,
    onRequestDeleteAll: () -> Unit,
    onClearConfirm: () -> Unit,
) {
    val context = LocalContext.current
    var actaId by remember(data.rondas) { mutableStateOf(data.rondas.firstOrNull()?.id.orEmpty()) }
    val picker = rememberLauncherForActivityResult(ActivityResultContracts.OpenDocument()) { uri: Uri? ->
        uri ?: return@rememberLauncherForActivityResult
        runCatching {
            context.contentResolver.openInputStream(uri)?.bufferedReader()?.use { it.readText() }
        }.getOrNull()?.let { raw ->
            viewModel.restoreFromJson(raw) { onClearConfirm() }
        }
    }

    Column(Modifier.verticalScroll(rememberScrollState())) {
        RspCard {
            Text("Exportar y respaldar", style = androidx.compose.material3.MaterialTheme.typography.titleMedium)
            HintText("Los datos viven en este dispositivo. Exporte con regularidad y guarde el respaldo donde corresponda.")
            ExportBlock(
                title = "Consolidado de rondas",
                description = "Una fila por ronda con conteos y porcentaje.",
                onExport = { viewModel.exportCsvRondas(context) },
            )
            ExportBlock(
                title = "Detalle ítem por ítem",
                description = "Cada ítem verificado con su resultado y observación.",
                onExport = { viewModel.exportCsvDetalle(context) },
            )
            ExportBlock(
                title = "Planes de mejoramiento",
                description = "Los 5W1H completos con responsable, fecha y estado.",
                onExport = { viewModel.exportCsvHallazgos(context) },
            )
            ExportBlock(
                title = "Respaldo completo",
                description = "Archivo JSON con todo. Sirve para restaurar en otro equipo.",
                onExport = { viewModel.exportBackup(context) },
                extra = {
                    if (confirmRestore) {
                        Button(onClick = { picker.launch(arrayOf("application/json")) }) {
                            Text("Seleccionar respaldo")
                        }
                    } else {
                        OutlinedButton(onClick = onRequestRestore) { Text("Restaurar") }
                    }
                },
            )
        }

        RspCard {
            Text("Actas e informes", fontWeight = FontWeight.Bold)
            HintText("Genera un PDF imprimible de una ronda concreta.")
            if (data.rondas.isEmpty()) {
                Text("Sin rondas disponibles", color = RspColors.Tinta3)
            } else {
                RondaActaSelector(data, actaId) { actaId = it }
                GenerarActaButton(
                    ronda = data.rondas.find { it.id == actaId },
                    enabled = actaId.isNotBlank(),
                    modifier = Modifier.padding(top = 8.dp),
                    onExport = { firmas -> viewModel.exportActa(context, actaId, firmas) },
                )
            }
        }

        RspCard {
            Text("Borrar todo", fontWeight = FontWeight.Bold)
            HintText("Elimina rondas, resultados y planes de este dispositivo. No se puede deshacer.")
            when (confirmDeleteAll) {
                0 -> OutlinedButton(onClick = onRequestDeleteAll) { Text("Borrar todos los datos") }
                1 -> Button(
                    onClick = onRequestDeleteAll,
                    colors = ButtonDefaults.buttonColors(containerColor = RspColors.No),
                ) { Text("Confirmar (1/2)") }
                else -> Button(
                    onClick = {
                        viewModel.borrarTodo {}
                        onClearConfirm()
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = RspColors.No),
                ) { Text("Confirmar definitivo (2/2)") }
            }
        }
    }
}

@Composable
private fun ExportBlock(
    title: String,
    description: String,
    onExport: () -> Unit,
    extra: @Composable (() -> Unit)? = null,
) {
    Column(Modifier.padding(vertical = 10.dp)) {
        Text(title, fontWeight = FontWeight.Bold)
        Text(description, color = RspColors.Tinta3, style = androidx.compose.material3.MaterialTheme.typography.bodySmall, modifier = Modifier.padding(vertical = 4.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedButton(onClick = onExport) { Text("Descargar") }
            extra?.invoke()
        }
    }
}

@Composable
private fun RondaActaSelector(data: AppData, selectedId: String, onSelect: (String) -> Unit) {
    var expanded by remember { mutableStateOf(false) }
    val selected = data.rondas.find { it.id == selectedId }
    Column {
        OutlinedButton(onClick = { expanded = !expanded }, modifier = Modifier.fillMaxWidth()) {
            Text(selected?.let { "${it.id} · ${it.servicio} · ${fmtF(it.fecha)}" } ?: "Seleccionar ronda")
        }
        if (expanded) {
            data.rondas.forEach { ronda ->
                TextButton(
                    onClick = { onSelect(ronda.id); expanded = false },
                    modifier = Modifier.fillMaxWidth(),
                ) { Text("${ronda.id} · ${ronda.servicio}") }
            }
        }
    }
}
