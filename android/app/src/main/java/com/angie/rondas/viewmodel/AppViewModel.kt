package com.angie.rondas.viewmodel

import android.app.Application
import android.content.Context
import android.content.Intent
import androidx.core.content.FileProvider
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.angie.rondas.RondasApplication
import com.angie.rondas.data.model.AppData
import com.angie.rondas.data.model.FirmasActa
import com.angie.rondas.data.model.ResultadoEstado
import com.angie.rondas.data.repository.AppRepository
import com.angie.rondas.data.repository.CrearRondaInput
import com.angie.rondas.util.ActaFileSaver
import android.print.ActaPdfExporter
import com.angie.rondas.util.ExportUtils
import com.angie.rondas.util.hoy
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlin.coroutines.resume
import java.io.File

data class UiMessage(val text: String)

class AppViewModel(application: Application) : AndroidViewModel(application) {
    private val repository: AppRepository = (application as RondasApplication).appRepository

    private val _data = MutableStateFlow(AppData())
    val data: StateFlow<AppData> = _data.asStateFlow()

    private val _messages = MutableSharedFlow<UiMessage>()
    val messages: SharedFlow<UiMessage> = _messages.asSharedFlow()

    val catalog get() = repository.catalog

    init {
        viewModelScope.launch {
            repository.appData.collect { loaded ->
                _data.value = loaded
            }
        }
    }

    private fun toast(text: String) {
        viewModelScope.launch { _messages.emit(UiMessage(text)) }
    }

    fun crearRonda(input: CrearRondaInput, onCreated: (String) -> Unit) {
        viewModelScope.launch {
            val (_, ronda) = repository.crearRonda(_data.value, input)
            onCreated(ronda.id)
        }
    }

    fun borrarRonda(id: String, onDone: () -> Unit = {}) {
        viewModelScope.launch {
            repository.borrarRonda(_data.value, id)
            toast("Ronda eliminada")
            onDone()
        }
    }

    fun marcar(rondaId: String, itemId: String, estado: ResultadoEstado) {
        viewModelScope.launch { repository.marcar(_data.value, rondaId, itemId, estado) }
    }

    fun setObservacionItem(rondaId: String, itemId: String, obs: String) {
        viewModelScope.launch { repository.setObservacionItem(_data.value, rondaId, itemId, obs) }
    }

    fun setObservacionRonda(rondaId: String, obs: String) {
        viewModelScope.launch { repository.setObservacionRonda(_data.value, rondaId, obs) }
    }

    fun marcarTodo(rondaId: String, estado: ResultadoEstado, onConfirm: () -> Unit) {
        onConfirm()
        viewModelScope.launch { repository.marcarTodo(_data.value, rondaId, estado) }
    }

    fun limpiarResultados(rondaId: String, onConfirm: () -> Unit) {
        onConfirm()
        viewModelScope.launch { repository.limpiarResultados(_data.value, rondaId) }
    }

    fun crearHallazgo(rondaId: String, itemId: String, onDone: () -> Unit = {}) {
        viewModelScope.launch {
            repository.crearHallazgo(_data.value, rondaId, itemId)
            onDone()
        }
    }

    fun generarPendientes() {
        viewModelScope.launch {
            val (_, count) = repository.generarPendientes(_data.value)
            toast(
                if (count > 0) "$count plan(es) generado(s) — revíselos y valídelos"
                else "Todas las no conformidades ya tienen plan",
            )
        }
    }

    fun validarHallazgo(id: String) {
        viewModelScope.launch {
            repository.validarHallazgo(_data.value, id)
            toast("Plan validado")
        }
    }

    fun restaurarPropuesta(id: String, onConfirm: () -> Unit) {
        onConfirm()
        viewModelScope.launch {
            val ok = repository.restaurarPropuesta(_data.value, id)
            if (ok == null) toast("Este ítem no tiene propuesta en la biblioteca")
        }
    }

    fun setHallazgoCampo(id: String, campo: String, valor: String) {
        viewModelScope.launch { repository.setHallazgoCampo(_data.value, id, campo, valor) }
    }

    fun borrarHallazgo(id: String, onConfirm: () -> Unit) {
        onConfirm()
        viewModelScope.launch { repository.borrarHallazgo(_data.value, id) }
    }

    fun tieneHallazgo(rondaId: String, itemId: String): Boolean =
        repository.tieneHallazgo(_data.value, rondaId, itemId)

    fun borrarTodo(onConfirm: () -> Unit) {
        onConfirm()
        viewModelScope.launch {
            repository.borrarTodo()
            toast("Datos eliminados")
        }
    }

    fun restoreFromJson(raw: String, onConfirm: () -> Unit) {
        onConfirm()
        viewModelScope.launch {
            try {
                val normalized = repository.restoreFromJson(raw)
                if (normalized != null) {
                    repository.replaceData(normalized)
                    toast("Respaldo restaurado")
                }
            } catch (_: Exception) {
                toast("El archivo no es un respaldo válido de esta herramienta")
            }
        }
    }

    fun shareFile(context: Context, file: File, fileName: String, mimeType: String, chooserTitle: String) {
        viewModelScope.launch {
            try {
                val uri = FileProvider.getUriForFile(context, "${context.packageName}.fileprovider", file)
                val intent = Intent(Intent.ACTION_SEND).apply {
                    type = mimeType
                    putExtra(Intent.EXTRA_STREAM, uri)
                    putExtra(Intent.EXTRA_SUBJECT, fileName)
                    addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                }
                context.startActivity(Intent.createChooser(intent, chooserTitle))
            } catch (_: Exception) {
                toast("No se pudo exportar el archivo")
            }
        }
    }

    fun shareText(context: Context, fileName: String, content: String, mimeType: String) {
        viewModelScope.launch {
            try {
                val dir = File(context.cacheDir, "exports").apply { mkdirs() }
                val file = File(dir, fileName)
                file.writeText(content, Charsets.UTF_8)
                shareFile(context, file, fileName, mimeType, "Compartir archivo")
                toast("Archivo listo para compartir")
            } catch (_: Exception) {
                toast("No se pudo exportar el archivo")
            }
        }
    }

    fun exportCsvRondas(context: Context) {
        shareText(context, "rondas_consolidado.csv", ExportUtils.csvRondas(_data.value.rondas, catalog), "text/csv")
    }

    fun exportCsvDetalle(context: Context) {
        shareText(context, "rondas_detalle_items.csv", ExportUtils.csvDetalle(_data.value.rondas, catalog), "text/csv")
    }

    fun exportCsvHallazgos(context: Context) {
        shareText(context, "planes_mejoramiento_5w1h.csv", ExportUtils.csvHallazgos(_data.value, catalog), "text/csv")
    }

    fun exportBackup(context: Context) {
        shareText(context, "respaldo_rondas_${hoy()}.json", repository.backupJson(_data.value), "application/json")
    }

    fun exportActa(context: Context, rondaId: String, firmas: FirmasActa) {
        viewModelScope.launch {
            val ronda = _data.value.rondas.find { it.id == rondaId } ?: return@launch
            val html = ExportUtils.actaHtml(ronda, _data.value.hallazgos, catalog, firmas)
            val dir = File(context.cacheDir, "exports").apply { mkdirs() }
            val fileName = "acta_${ronda.id}.pdf"
            val pdfFile = File(dir, fileName)

            val generated = suspendCancellableCoroutine { cont ->
                ActaPdfExporter.htmlToPdf(context, html, pdfFile) { success ->
                    if (cont.isActive) cont.resume(success)
                }
            }
            if (!generated) {
                toast("No se pudo generar el PDF del acta")
                return@launch
            }

            val savedUri = ActaFileSaver.saveToDownloads(context, pdfFile, fileName)
            if (savedUri != null) {
                toast("Acta guardada en Descargas: $fileName")
            } else {
                shareFile(context, pdfFile, fileName, "application/pdf", "Guardar acta PDF")
                toast("Seleccione dónde guardar el PDF")
            }
        }
    }
}
