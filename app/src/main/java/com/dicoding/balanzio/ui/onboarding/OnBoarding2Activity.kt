package com.dicoding.balanzio.ui.onboarding

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.dicoding.balanzio.R
import com.dicoding.balanzio.databinding.ActivityOnBoarding1Binding
import com.dicoding.balanzio.databinding.ActivityOnBoarding2Binding

class OnBoarding2Activity : AppCompatActivity() {

    private lateinit var binding: ActivityOnBoarding2Binding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityOnBoarding2Binding.inflate(layoutInflater)
        setContentView(binding.root)

        val tvKlikNext = findViewById<View>(R.id.btn_next)
        tvKlikNext.setOnClickListener {
            goToOnBoarding3()
        }
    }

    private fun goToOnBoarding3() {
        val intent = Intent(this, OnBoarding3Activity::class.java)
        startActivity(intent)
    }
}