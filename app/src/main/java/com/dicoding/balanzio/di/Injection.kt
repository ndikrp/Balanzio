package com.dicoding.balanzio.di

import android.content.Context
import com.dicoding.balanzio.data.UserRepository
import com.dicoding.balanzio.data.pref.UserPreference
import com.dicoding.balanzio.data.pref.dataStore

object Injection {
    fun provideRepository(context: Context): UserRepository {
        val pref = UserPreference.getInstance(context.dataStore)
        return UserRepository.getInstance(pref)
    }
}