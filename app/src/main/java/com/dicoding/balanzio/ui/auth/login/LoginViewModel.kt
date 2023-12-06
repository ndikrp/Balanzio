package com.dicoding.balanzio.ui.auth.login

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dicoding.balanzio.data.UserRepository
import com.dicoding.balanzio.data.pref.UserModel
import kotlinx.coroutines.launch
import okhttp3.RequestBody

class LoginViewModel(private val repository: UserRepository) : ViewModel() {
    fun saveSession(user: UserModel) {
        viewModelScope.launch {
            repository.saveSession(user)
        }
    }

    fun login(requestBody: RequestBody) =
        repository.userLogin(requestBody)
}