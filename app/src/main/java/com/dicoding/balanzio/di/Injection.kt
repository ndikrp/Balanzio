package com.dicoding.balanzio.di

import android.content.Context
import com.dicoding.balanzio.data.UserRepository
import com.dicoding.balanzio.data.pref.UserPreference
import com.dicoding.balanzio.data.pref.dataStore
import com.dicoding.balanzio.remote.ApiConfig
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking

object Injection {
    fun provideRepository(context: Context): UserRepository {
        val pref = UserPreference.getInstance(context.dataStore)
        val user = runBlocking { pref.getSession().first() }
        val apiService = ApiConfig.getApiService(user.token)
        return UserRepository.getInstance(apiService,pref)
    }
}