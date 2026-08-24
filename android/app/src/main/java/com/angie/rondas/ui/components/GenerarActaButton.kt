package com.angie.rondas.ui.components

import androidx.compose.material3.Button
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import com.angie.rondas.data.model.FirmasActa
import com.angie.rondas.data.model.Ronda

@Composable
fun GenerarActaButton(
    ronda: Ronda?,
    enabled: Boolean = true,
    outlined: Boolean = true,
    modifier: Modifier = Modifier,
    onExport: (FirmasActa) -> Unit,
) {
    var showDialog by remember { mutableStateOf(false) }

    if (outlined) {
        OutlinedButton(
            onClick = { if (ronda != null) showDialog = true },
            enabled = enabled && ronda != null,
            modifier = modifier,
        ) {
            Text("Generar acta")
        }
    } else {
        Button(
            onClick = { if (ronda != null) showDialog = true },
            enabled = enabled && ronda != null,
            modifier = modifier,
        ) {
            Text("Generar acta")
        }
    }

    if (showDialog && ronda != null) {
        FirmaActaDialog(
            liderSugerido = ronda.lider,
            onDismiss = { showDialog = false },
            onConfirm = { firmas ->
                showDialog = false
                onExport(firmas)
            },
        )
    }
}
