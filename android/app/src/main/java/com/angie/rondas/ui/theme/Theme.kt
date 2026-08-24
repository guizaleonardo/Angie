package com.angie.rondas.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

object RspColors {
    val Papel = Color(0xFFF4F6F9)
    val Sup = Color(0xFFFFFFFF)
    val Tinta = Color(0xFF102033)
    val Tinta2 = Color(0xFF4A5A6A)
    val Tinta3 = Color(0xFF7A8896)
    val Linea = Color(0xFFDCE3EA)
    val Linea2 = Color(0xFFC3CDD6)
    val Marca = Color(0xFF0E4A7A)
    val MarcaSuave = Color(0xFFE4EEF6)
    val Si = Color(0xFF1A6B9E)
    val SiBg = Color(0xFFE6F1F8)
    val No = Color(0xFFB3261E)
    val NoBg = Color(0xFFFBE9E7)
    val Na = Color(0xFF6B7280)
    val NaBg = Color(0xFFEEF0EF)
    val Alerta = Color(0xFF9A5B00)
    val AlertaBg = Color(0xFFFDF1DC)
    val Mk = Color(0xFF0E4A7A)
    val MkBg = Color(0xFFE4EEF6)
}

private val LightColors = lightColorScheme(
    primary = RspColors.Marca,
    onPrimary = Color.White,
    secondary = RspColors.Si,
    background = RspColors.Papel,
    surface = RspColors.Sup,
    onBackground = RspColors.Tinta,
    onSurface = RspColors.Tinta,
    outline = RspColors.Linea2,
    inverseSurface = RspColors.Tinta,
    inverseOnSurface = RspColors.Sup,
)

@Composable
fun RondasTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = LightColors,
        typography = MaterialTheme.typography.copy(
            headlineMedium = TextStyle(
                fontFamily = FontFamily.Serif,
                fontWeight = FontWeight.SemiBold,
                fontSize = 20.sp,
                color = RspColors.Tinta,
            ),
            titleMedium = TextStyle(
                fontFamily = FontFamily.Serif,
                fontWeight = FontWeight.SemiBold,
                fontSize = 16.sp,
                color = RspColors.Tinta,
            ),
            bodyMedium = TextStyle(fontSize = 14.sp, color = RspColors.Tinta),
            labelSmall = TextStyle(
                fontSize = 11.sp,
                fontWeight = FontWeight.SemiBold,
                letterSpacing = 0.5.sp,
                color = RspColors.Tinta3,
            ),
        ),
        content = content,
    )
}

fun nivelColors(cssClass: String): Pair<Color, Color> = when (cssClass) {
    "p-si" -> RspColors.Si to RspColors.SiBg
    "p-no" -> RspColors.No to RspColors.NoBg
    "p-al" -> RspColors.Alerta to RspColors.AlertaBg
    "p-mk" -> RspColors.Mk to RspColors.MkBg
    else -> RspColors.Na to RspColors.NaBg
}

fun resultadoColor(estado: com.angie.rondas.data.model.ResultadoEstado?): Color = when (estado) {
    com.angie.rondas.data.model.ResultadoEstado.C -> RspColors.Si
    com.angie.rondas.data.model.ResultadoEstado.NC -> RspColors.No
    com.angie.rondas.data.model.ResultadoEstado.NA -> RspColors.Na
    null -> RspColors.Linea
}
