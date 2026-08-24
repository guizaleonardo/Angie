package com.angie.rondas.ui.navigation

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.ListAlt
import androidx.compose.material.icons.outlined.Assessment
import androidx.compose.material.icons.outlined.Checklist
import androidx.compose.material.icons.outlined.CloudDownload
import androidx.compose.material.icons.outlined.ReportProblem
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import com.angie.rondas.ui.theme.RspColors

enum class AppRoute(val route: String, val label: String, val icon: ImageVector) {
    Dashboard("dashboard", "Tablero", Icons.Outlined.Assessment),
    Rondas("rondas", "Rondas", Icons.Outlined.ListAlt),
    Aplicar("aplicar", "Aplicar", Icons.Outlined.Checklist),
    Hallazgos("hallazgos", "Hallazgos", Icons.Outlined.ReportProblem),
    Datos("datos", "Datos", Icons.Outlined.CloudDownload),
}

@Composable
fun BottomNavBar(currentRoute: String?, onNavigate: (AppRoute) -> Unit) {
    NavigationBar(containerColor = RspColors.Marca, tonalElevation = 0.dp) {
        AppRoute.values().forEach { route ->
            val selected = currentRoute?.startsWith(route.route) == true
            NavigationBarItem(
                selected = selected,
                onClick = { onNavigate(route) },
                icon = { Icon(route.icon, contentDescription = route.label) },
                label = { Text(route.label) },
                colors = NavigationBarItemDefaults.colors(
                    selectedIconColor = RspColors.Sup,
                    selectedTextColor = RspColors.Sup,
                    unselectedIconColor = RspColors.Sup.copy(alpha = 0.65f),
                    unselectedTextColor = RspColors.Sup.copy(alpha = 0.65f),
                    indicatorColor = RspColors.Marca.copy(alpha = 0.35f),
                ),
            )
        }
    }
}
