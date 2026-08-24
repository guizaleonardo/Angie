package com.angie.rondas.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.angie.rondas.ui.theme.RspColors
import com.angie.rondas.ui.theme.nivelColors

@Composable
fun RspCard(
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit,
) {
    Card(
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp),
        colors = CardDefaults.cardColors(containerColor = RspColors.Sup),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
        shape = RoundedCornerShape(6.dp),
    ) {
        Column(Modifier.padding(16.dp)) { content() }
    }
}

@Composable
fun HintText(text: String, modifier: Modifier = Modifier) {
    Text(
        text = text,
        style = MaterialTheme.typography.bodySmall,
        color = RspColors.Tinta3,
        modifier = modifier.padding(bottom = 12.dp),
    )
}

@Composable
fun KpiTile(value: String, label: String, accent: Boolean = false, risk: Boolean = false) {
    val bg = when {
        risk -> RspColors.NoBg
        accent -> RspColors.MarcaSuave
        else -> RspColors.Papel
    }
    Column(
        modifier = Modifier
            .clip(RoundedCornerShape(6.dp))
            .background(bg)
            .border(1.dp, RspColors.Linea, RoundedCornerShape(6.dp))
            .padding(12.dp),
    ) {
        Text(
            text = value,
            style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold),
            color = if (risk) RspColors.No else RspColors.Marca,
        )
        Text(text = label.uppercase(), style = MaterialTheme.typography.labelSmall)
    }
}

@Composable
fun Pill(text: String, cssClass: String = "p-na") {
    val (fg, bg) = nivelColors(cssClass)
    Text(
        text = text,
        color = fg,
        modifier = Modifier
            .clip(RoundedCornerShape(999.dp))
            .background(bg)
            .padding(horizontal = 10.dp, vertical = 4.dp),
        style = MaterialTheme.typography.labelSmall,
    )
}

@Composable
fun ProgressBar(value: Double?, modifier: Modifier = Modifier) {
    val pct = ((value ?: 0.0) * 100).coerceIn(0.0, 100.0)
    val color = when {
        value == null -> RspColors.Linea
        value >= 0.9 -> RspColors.Si
        value >= 0.75 -> RspColors.Mk
        value >= 0.6 -> RspColors.Alerta
        else -> RspColors.No
    }
    Box(
        modifier = modifier
            .fillMaxWidth()
            .height(8.dp)
            .clip(RoundedCornerShape(4.dp))
            .background(RspColors.Linea),
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth(fraction = (pct / 100).toFloat())
                .height(8.dp)
                .background(color),
        )
    }
}

@Composable
fun EmptyState(title: String, subtitle: String? = null, action: @Composable (() -> Unit)? = null) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        Text(title, style = MaterialTheme.typography.titleMedium, textAlign = TextAlign.Center)
        if (subtitle != null) {
            Text(subtitle, color = RspColors.Tinta3, textAlign = TextAlign.Center)
        }
        action?.invoke()
    }
}

@Composable
fun MonoBadge(text: String, color: Color = RspColors.Marca) {
    Text(
        text = text,
        color = color,
        fontFamily = FontFamily.Monospace,
        fontWeight = FontWeight.SemiBold,
        style = MaterialTheme.typography.labelLarge,
    )
}

@Composable
fun AvisoBox(text: String, modifier: Modifier = Modifier) {
    Text(
        text = text,
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(6.dp))
            .background(RspColors.AlertaBg)
            .border(1.dp, RspColors.Alerta.copy(alpha = 0.3f), RoundedCornerShape(6.dp))
            .padding(12.dp),
        color = RspColors.Alerta,
        style = MaterialTheme.typography.bodySmall,
    )
}

@Composable
fun ItemTira(
    ids: List<String>,
    resultados: Map<String, com.angie.rondas.data.model.ItemResultado>,
) {
    Row(horizontalArrangement = Arrangement.spacedBy(2.dp), modifier = Modifier.fillMaxWidth()) {
        ids.forEach { id ->
            val estado = resultados[id]?.r
            Box(
                modifier = Modifier
                    .weight(1f)
                    .height(6.dp)
                    .clip(RoundedCornerShape(1.dp))
                    .background(
                        when (estado) {
                            com.angie.rondas.data.model.ResultadoEstado.C -> RspColors.Si
                            com.angie.rondas.data.model.ResultadoEstado.NC -> RspColors.No
                            com.angie.rondas.data.model.ResultadoEstado.NA -> RspColors.Na
                            null -> RspColors.Linea
                        },
                    ),
            )
        }
    }
}
