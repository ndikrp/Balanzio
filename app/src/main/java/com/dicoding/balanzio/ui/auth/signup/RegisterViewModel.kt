package com.dicoding.balanzio.ui.auth.signup


import androidx.lifecycle.ViewModel
import com.dicoding.balanzio.data.UserRepository

class RegisterViewModel(private val userRepository: UserRepository) : ViewModel() {

    fun register(name: String,
                 email: String,
                 password: String,
                 gender: String,
                 weight: Int,
                 height: Int,
                 age: Int) =
        userRepository.userRegistrasi(name, email, password, gender, weight, height, age)
}