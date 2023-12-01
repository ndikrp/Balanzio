package com.dicoding.balanzio.ui.splash

import android.animation.ObjectAnimator
import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.dicoding.balanzio.databinding.ActivitySplashscreenBinding
import com.dicoding.balanzio.ui.auth.login.LoginActivity

class SplashscreenActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySplashscreenBinding
    private val SPLASH_TIME_OUT: Long = 3000

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySplashscreenBinding.inflate(layoutInflater)
        setContentView(binding.root)

        playAnimation()

        binding.root.postDelayed({
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }, SPLASH_TIME_OUT)
    }

    private fun playAnimation() {
        ObjectAnimator.ofFloat(binding.logoSplashText, View.TRANSLATION_Y, -200f, 200f).apply {
            duration = 6000
            start()
        }
    }
}
