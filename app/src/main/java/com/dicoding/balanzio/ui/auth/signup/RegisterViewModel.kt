package com.dicoding.balanzio.ui.auth.signup



import androidx.lifecycle.ViewModel
import com.dicoding.balanzio.data.UserRepository
import okhttp3.RequestBody

class RegisterViewModel(private val userRepository: UserRepository) : ViewModel() {

    fun register(requestBody: RequestBody) =
        userRepository.userRegistrasi(requestBody)
}