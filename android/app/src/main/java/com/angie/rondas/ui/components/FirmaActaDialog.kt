package com.angie.rondas.ui.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import com.angie.rondas.data.model.FirmaActa
import com.angie.rondas.data.model.FirmasActa

@Composable
fun FirmaActaDialog(
    liderSugerido: String,
    onDismiss: () -> Unit,
    onConfirm: (FirmasActa) -> Unit,
) {
    var seguridadNombre by remember { mutableStateOf(liderSugerido) }
    var coordinadorNombre by remember { mutableStateOf("") }
    var seguridadImagen by remember { mutableStateOf("") }
    var coordinadorImagen by remember { mutableStateOf("") }

    val listo = seguridadNombre.isNotBlank() &&
        coordinadorNombre.isNotBlank() &&
        seguridadImagen.isNotBlank() &&
        coordinadorImagen.isNotBlank()

    Dialog(onDismissRequest = onDismiss) {
        RspCard {
            Column(Modifier.verticalScroll(rememberScrollState())) {
                Text("Firmas del acta", style = androidx.compose.material3.MaterialTheme.typography.titleMedium)
                HintText(
                    "Antes de generar el documento deben firmar el líder de seguridad del paciente " +
                        "y el líder o coordinador del servicio.",
                )
                Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
                    Column {
                        OutlinedTextField(
                            value = seguridadNombre,
                            onValueChange = { seguridadNombre = it },
                            label = { Text("Líder de seguridad del paciente") },
                            placeholder = { Text("Nombre y cargo") },
                            modifier = Modifier.fillMaxWidth(),
                        )
                        Text(
                            "Firma manuscrita",
                            style = androidx.compose.material3.MaterialTheme.typography.labelSmall,
                            modifier = Modifier.padding(top = 10.dp, bottom = 4.dp),
                        )
                        SignaturePad(value = seguridadImagen, onChange = { seguridadImagen = it })
                    }
                    Column {
                        OutlinedTextField(
                            value = coordinadorNombre,
                            onValueChange = { coordinadorNombre = it },
                            label = { Text("Líder o coordinador del servicio") },
                            placeholder = { Text("Nombre y cargo") },
                            modifier = Modifier.fillMaxWidth(),
                        )
                        Text(
                            "Firma manuscrita",
                            style = androidx.compose.material3.MaterialTheme.typography.labelSmall,
                            modifier = Modifier.padding(top = 10.dp, bottom = 4.dp),
                        )
                        SignaturePad(value = coordinadorImagen, onChange = { coordinadorImagen = it })
                    }
                }
                if (!listo) {
                    AvisoBox(
                        "Complete nombre y firma de ambas personas para continuar.",
                        modifier = Modifier.padding(top = 14.dp),
                    )
                }
                Row(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    modifier = Modifier.padding(top = 14.dp),
                ) {
                    OutlinedButton(onClick = onDismiss) { Text("Cancelar") }
                    Button(
                        enabled = listo,
                        onClick = {
                            onConfirm(
                                FirmasActa(
                                    seguridad = FirmaActa(seguridadNombre.trim(), seguridadImagen),
                                    coordinador = FirmaActa(coordinadorNombre.trim(), coordinadorImagen),
                                ),
                            )
                        },
                    ) {
                        Text("Generar acta")
                    }
                }
            }
        }
    }
}
