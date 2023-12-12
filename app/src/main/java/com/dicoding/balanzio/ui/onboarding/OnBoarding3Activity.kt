package com.dicoding.balanzio.ui.onboarding

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.dicoding.balanzio.R
import com.dicoding.balanzio.databinding.ActivityOnBoarding1Binding
import com.dicoding.balanzio.databinding.ActivityOnBoarding3Binding
import com.dicoding.balanzio.ui.auth.login.LoginActivity

class OnBoarding3Activity : AppCompatActivity() {

    private lateinit var binding: ActivityOnBoarding3Binding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityOnBoarding3Binding.inflate(layoutInflater)
        setContentView(binding.root)

        val tvKlikMasuk = findViewById<View>(R.id.btn_masuk_onboarding)
        tvKlikMasuk.setOnClickListener {
            goToLogin()
        }
    }

    private fun goToLogin() {
        val intent = Intent(this, LoginActivity::class.java)
        startActivity(intent)
    }
}