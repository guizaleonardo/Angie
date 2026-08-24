package com.angie.rondas

import android.app.Application
import com.angie.rondas.data.catalog.CatalogRepository
import com.angie.rondas.data.repository.AppRepository
import com.angie.rondas.data.storage.AppStorage

class RondasApplication : Application() {
    val catalogRepository by lazy { CatalogRepository(this) }
    val appRepository by lazy { AppRepository(AppStorage(this), catalogRepository) }
}
