package com.angie.rondas

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.angie.rondas.ui.navigation.AppRoute
import com.angie.rondas.ui.navigation.BottomNavBar
import com.angie.rondas.ui.screens.AplicarScreen
import com.angie.rondas.ui.screens.DashboardScreen
import com.angie.rondas.ui.screens.DatosScreen
import com.angie.rondas.ui.screens.HallazgosScreen
import com.angie.rondas.ui.screens.RondasScreen
import com.angie.rondas.ui.theme.RondasTheme
import com.angie.rondas.ui.theme.RspColors
import com.angie.rondas.viewmodel.AppViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            RondasTheme {
                RondasApp()
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RondasApp(viewModel: AppViewModel = viewModel()) {
    val navController = rememberNavController()
    val snackbarHostState = remember { SnackbarHostState() }
    val data by viewModel.data.collectAsState()
    val context = LocalContext.current
    var pendingDeleteRondaId by remember { mutableStateOf<String?>(null) }
    var pendingDeleteHallazgoId by remember { mutableStateOf<String?>(null) }
    var pendingRestoreHallazgoId by remember { mutableStateOf<String?>(null) }
    var confirmRestoreBackup by remember { mutableStateOf(false) }
    var confirmDeleteAllStep by remember { mutableStateOf(0) }
    var confirmAplicarAction by remember { mutableStateOf("") }
    val backStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = backStackEntry?.destination?.route

    LaunchedEffect(viewModel) {
        viewModel.messages.collect { message ->
            snackbarHostState.showSnackbar(message.text)
        }
    }

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        snackbarHost = {
            SnackbarHost(
                hostState = snackbarHostState,
                modifier = Modifier.padding(8.dp),
            ) { data ->
                Surface(
                    color = RspColors.Marca,
                    shape = MaterialTheme.shapes.small,
                    shadowElevation = 6.dp,
                ) {
                    Text(
                        text = data.visuals.message,
                        modifier = Modifier.padding(horizontal = 16.dp, vertical = 14.dp),
                        color = Color.White,
                        style = MaterialTheme.typography.bodyMedium.copy(color = Color.White),
                    )
                }
            }
        },
        topBar = {
            Column(
                Modifier
                    .fillMaxWidth()
                    .background(RspColors.Marca)
                    .padding(horizontal = 16.dp, vertical = 14.dp),
            ) {
                Text(
                    "Rondas de seguridad del paciente",
                    color = RspColors.Sup,
                    fontWeight = FontWeight.SemiBold,
                )
                Text(
                    "Guía Técnica BPSP · Res. 3100/2019",
                    color = RspColors.Sup.copy(alpha = 0.8f),
                    style = androidx.compose.material3.MaterialTheme.typography.bodySmall,
                )
            }
        },
        bottomBar = {
            BottomNavBar(currentRoute) { route ->
                pendingDeleteRondaId = null
                confirmDeleteAllStep = 0
                when (route) {
                    AppRoute.Dashboard -> navController.navigate(AppRoute.Dashboard.route) {
                        popUpTo(AppRoute.Dashboard.route) { inclusive = true }
                        launchSingleTop = true
                    }
                    AppRoute.Rondas -> navController.navigate(AppRoute.Rondas.route) {
                        launchSingleTop = true
                    }
                    AppRoute.Aplicar -> {
                        val target = data.rondas.lastOrNull()?.id
                        if (target != null) {
                            navController.navigate("${AppRoute.Aplicar.route}/$target") { launchSingleTop = true }
                        } else {
                            navController.navigate(AppRoute.Aplicar.route) { launchSingleTop = true }
                        }
                    }
                    AppRoute.Hallazgos -> navController.navigate(AppRoute.Hallazgos.route) { launchSingleTop = true }
                    AppRoute.Datos -> navController.navigate(AppRoute.Datos.route) { launchSingleTop = true }
                }
            }
        },
    ) { padding ->
        NavHost(
            navController = navController,
            startDestination = AppRoute.Dashboard.route,
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .background(RspColors.Papel),
        ) {
            composable(AppRoute.Dashboard.route) {
                DashboardScreen(
                    viewModel = viewModel,
                    data = data,
                    onCreateRonda = { navController.navigate(AppRoute.Rondas.route) },
                )
            }
            composable(AppRoute.Rondas.route) {
                RondasScreen(
                    viewModel = viewModel,
                    data = data,
                    onAplicar = { id ->
                        pendingDeleteRondaId = null
                        navController.navigate("${AppRoute.Aplicar.route}/$id")
                    },
                    pendingDeleteId = pendingDeleteRondaId,
                    onRequestDelete = { id ->
                        if (pendingDeleteRondaId == id) {
                            viewModel.borrarRonda(id)
                            pendingDeleteRondaId = null
                        } else {
                            pendingDeleteRondaId = id
                        }
                    },
                )
            }
            composable(AppRoute.Aplicar.route) {
                AplicarScreen(
                    viewModel = viewModel,
                    data = data,
                    rondaId = data.rondas.lastOrNull()?.id,
                    onSelectRonda = { id -> navController.navigate("${AppRoute.Aplicar.route}/$id") { launchSingleTop = true } },
                    onHallazgos = { navController.navigate(AppRoute.Hallazgos.route) },
                    onRondas = { navController.navigate(AppRoute.Rondas.route) },
                    onExportActa = { id, firmas -> viewModel.exportActa(context, id, firmas) },
                    confirmAction = confirmAplicarAction,
                    onConfirmAction = { confirmAplicarAction = it },
                )
            }
            composable(
                route = "${AppRoute.Aplicar.route}/{rondaId}",
                arguments = listOf(navArgument("rondaId") { type = NavType.StringType }),
            ) { entry ->
                val rondaId = entry.arguments?.getString("rondaId")
                AplicarScreen(
                    viewModel = viewModel,
                    data = data,
                    rondaId = rondaId,
                    onSelectRonda = { id -> navController.navigate("${AppRoute.Aplicar.route}/$id") { launchSingleTop = true } },
                    onHallazgos = { navController.navigate(AppRoute.Hallazgos.route) },
                    onRondas = { navController.navigate(AppRoute.Rondas.route) },
                    onExportActa = { id, firmas -> viewModel.exportActa(context, id, firmas) },
                    confirmAction = confirmAplicarAction,
                    onConfirmAction = { confirmAplicarAction = it },
                )
            }
            composable(AppRoute.Hallazgos.route) {
                HallazgosScreen(
                    viewModel = viewModel,
                    data = data,
                    confirmDeleteId = pendingDeleteHallazgoId,
                    confirmRestoreId = pendingRestoreHallazgoId,
                    onRequestDelete = { id ->
                        if (pendingDeleteHallazgoId == id) {
                            viewModel.borrarHallazgo(id) {}
                            pendingDeleteHallazgoId = null
                        } else {
                            pendingDeleteHallazgoId = id
                        }
                    },
                    onRequestRestore = { id ->
                        pendingRestoreHallazgoId = if (pendingRestoreHallazgoId == id) id else id
                    },
                    onClearConfirm = {
                        pendingDeleteHallazgoId = null
                        pendingRestoreHallazgoId = null
                    },
                )
            }
            composable(AppRoute.Datos.route) {
                DatosScreen(
                    viewModel = viewModel,
                    data = data,
                    confirmRestore = confirmRestoreBackup,
                    confirmDeleteAll = confirmDeleteAllStep,
                    onRequestRestore = { confirmRestoreBackup = true },
                    onRequestDeleteAll = {
                        confirmDeleteAllStep = when (confirmDeleteAllStep) {
                            0 -> 1
                            1 -> 2
                            else -> 0
                        }
                    },
                    onClearConfirm = {
                        confirmRestoreBackup = false
                        confirmDeleteAllStep = 0
                    },
                )
            }
        }
    }
}
