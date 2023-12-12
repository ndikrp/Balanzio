package com.dicoding.balanzio.ui.onboarding

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.dicoding.balanzio.R
import com.dicoding.balanzio.databinding.ActivityLoginBinding
import com.dicoding.balanzio.databinding.ActivityOnBoarding1Binding
import com.dicoding.balanzio.ui.auth.signup.RegisterActivity

class OnBoarding1Activity : AppCompatActivity() {

    private lateinit var binding: ActivityOnBoarding1Binding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityOnBoarding1Binding.inflate(layoutInflater)
        setContentView(binding.root)

        val tvKlikNext = findViewById<View>(R.id.btn_next)
        tvKlikNext.setOnClickListener {
            goToOnBoarding2()
        }
    }

    private fun goToOnBoarding2() {
        val intent = Intent(this, OnBoarding2Activity::class.java)
        startActivity(intent)
    }
}