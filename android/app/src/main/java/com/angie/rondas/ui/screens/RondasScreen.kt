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
import com.angie.rondas.data.model.Ronda
import com.angie.rondas.data.repository.CrearRondaInput
import com.angie.rondas.ui.components.EmptyState
import com.angie.rondas.ui.components.HintText
import com.angie.rondas.ui.components.ItemTira
import com.angie.rondas.ui.components.MonoBadge
import com.angie.rondas.ui.components.Pill
import com.angie.rondas.ui.components.RspCard
import com.angie.rondas.ui.theme.RspColors
import com.angie.rondas.util.conteo
import com.angie.rondas.util.fmtF
import com.angie.rondas.util.hoy
import com.angie.rondas.util.nivel
import com.angie.rondas.util.pct as formatPct
import com.angie.rondas.viewmodel.AppViewModel

@Composable
fun RondasScreen(
    viewModel: AppViewModel,
    data: AppData,
    onAplicar: (String) -> Unit,
    pendingDeleteId: String?,
    onRequestDelete: (String) -> Unit,
) {
    val catalog = viewModel.catalog
    var servicioCod by remember { mutableStateOf(catalog.bloquesServicio.firstOrNull()?.codigo ?: "F") }
    var fecha by remember { mutableStateOf(hoy()) }
    var lider by remember { mutableStateOf("") }
    var acompanantes by remember { mutableStateOf("") }
    val ordenadas = remember(data.rondas) { data.rondas.sortedByDescending { it.fecha } }

    Column(Modifier.verticalScroll(rememberScrollState())) {
        RspCard {
            Text("Programar una ronda", style = androidx.compose.material3.MaterialTheme.typography.titleMedium)
            HintText("Se cargan automáticamente los bloques transversales A–E más el módulo del servicio seleccionado.")
            ServicioDropdown(catalog.bloquesServicio.map { it.codigo to it.nombre }, servicioCod) { servicioCod = it }
            OutlinedTextField(
                value = fecha,
                onValueChange = { fecha = it },
                label = { Text("Fecha") },
                placeholder = { Text("AAAA-MM-DD") },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 8.dp),
            )
            OutlinedTextField(
                value = lider,
                onValueChange = { lider = it },
                label = { Text("Líder de la ronda") },
                placeholder = { Text("Nombre y cargo") },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 8.dp),
            )
            OutlinedTextField(
                value = acompanantes,
                onValueChange = { acompanantes = it },
                label = { Text("Acompañantes") },
                placeholder = { Text("Quiénes participaron") },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 8.dp),
            )
            Button(
                onClick = {
                    viewModel.crearRonda(CrearRondaInput(servicioCod, fecha, lider, acompanantes), onAplicar)
                },
                modifier = Modifier.padding(top = 12.dp),
            ) { Text("Crear ronda") }
        }

        if (data.rondas.isEmpty()) {
            RspCard {
                EmptyState(title = "Sin rondas registradas", subtitle = "La primera que cree aparecerá aquí.")
            }
        } else {
            RspCard {
                Text("Rondas registradas", style = androidx.compose.material3.MaterialTheme.typography.titleMedium)
                HintText("${data.rondas.size} en total. La tira de color muestra cada ítem verificado.")
                ordenadas.forEach { ronda ->
                    RondaListItem(
                        ronda = ronda,
                        catalog = catalog,
                        onAplicar = { onAplicar(ronda.id) },
                        onEliminar = { onRequestDelete(ronda.id) },
                        confirmingDelete = pendingDeleteId == ronda.id,
                    )
                }
            }
        }
    }
}

@Composable
private fun ServicioDropdown(options: List<Pair<String, String>>, selected: String, onSelect: (String) -> Unit) {
    var expanded by remember { mutableStateOf(false) }
    val label = options.find { it.first == selected }?.second ?: selected
    Column {
        Text("Servicio a auditar", style = androidx.compose.material3.MaterialTheme.typography.labelSmall)
        OutlinedButton(onClick = { expanded = !expanded }, modifier = Modifier.fillMaxWidth()) {
            Text(label, modifier = Modifier.weight(1f))
        }
        if (expanded) {
            Column(Modifier.fillMaxWidth()) {
                options.forEach { (codigo, nombre) ->
                    TextButton(
                        onClick = {
                            onSelect(codigo)
                            expanded = false
                        },
                        modifier = Modifier.fillMaxWidth(),
                    ) { Text(nombre) }
                }
            }
        }
    }
}

@Composable
private fun RondaListItem(
    ronda: Ronda,
    catalog: com.angie.rondas.data.catalog.CatalogRepository,
    onAplicar: () -> Unit,
    onEliminar: () -> Unit,
    confirmingDelete: Boolean,
) {
    val c = conteo(ronda, catalog)
    val nv = nivel(c.pct)
    val items = catalog.itemsDeServicio(ronda.servicioCod)
    Column(
        Modifier
            .fillMaxWidth()
            .padding(top = 12.dp),
    ) {
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            MonoBadge(ronda.id)
            Text(ronda.servicio, fontWeight = FontWeight.Bold)
        }
        Row(horizontalArrangement = Arrangement.spacedBy(6.dp), modifier = Modifier.padding(top = 4.dp)) {
            Pill("${nv.titulo}${if (c.pct != null) " · ${formatPct(c.pct)}" else ""}", nv.cssClass)
            if (c.den + c.na < c.total) {
                Pill("En curso · ${c.den + c.na}/${c.total}", "p-al")
            } else {
                Pill("Completa", "p-si")
            }
        }
        Text(
            "${fmtF(ronda.fecha)} · Líder: ${ronda.lider.ifBlank { "—" }}${if (ronda.acompanantes.isNotBlank()) " · Acompañantes: ${ronda.acompanantes}" else ""}",
            color = RspColors.Tinta3,
            style = androidx.compose.material3.MaterialTheme.typography.bodySmall,
            modifier = Modifier.padding(top = 4.dp),
        )
        Text(
            "Cumple ${c.c} · No cumple ${c.nc} · No aplica ${c.na}",
            color = RspColors.Tinta3,
            style = androidx.compose.material3.MaterialTheme.typography.bodySmall,
        )
        ItemTira(items.map { it.id }, ronda.resultados)
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.padding(top = 8.dp)) {
            Button(onClick = onAplicar) { Text("Aplicar") }
            if (confirmingDelete) {
                Button(onClick = onEliminar, colors = ButtonDefaults.buttonColors(containerColor = RspColors.No)) {
                    Text("Confirmar")
                }
            } else {
                OutlinedButton(onClick = onEliminar) { Text("Eliminar") }
            }
        }
    }
}
