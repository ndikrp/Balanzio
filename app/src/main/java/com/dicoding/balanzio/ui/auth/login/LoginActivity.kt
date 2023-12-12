package com.dicoding.balanzio.ui.auth.login

import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.view.WindowInsets
import android.view.WindowManager
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AlertDialog
import com.dicoding.balanzio.MainActivity
import com.dicoding.balanzio.R
import com.dicoding.balanzio.ViewModelFactory
import com.dicoding.balanzio.databinding.ActivityLoginBinding
import com.dicoding.balanzio.ui.auth.signup.RegisterActivity
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import com.dicoding.balanzio.data.Result
import com.dicoding.balanzio.ui.activity.ProfileActivity

class LoginActivity : AppCompatActivity() {

    private  val viewModel by viewModels<LoginViewModel> {
        ViewModelFactory.getInstance(this)
    }

    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupView()
        setupAction()

        val tvKlikDaftar = findViewById<View>(R.id.tv_klik_daftar)
        tvKlikDaftar.setOnClickListener {
            goToRegister()
        }

    }

    private fun setupView() {
        @Suppress("DEPRECATION")
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.insetsController?.hide(WindowInsets.Type.statusBars())
        } else {
            window.setFlags(
                WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN
            )
        }
        supportActionBar?.hide()
    }

    private fun setupAction() {
        binding.loginButton.setOnClickListener {
            val email = binding.emailEditText.text.toString()
            val pass = binding.passwordEditText.text.toString()
            val jsonObject = JSONObject().apply {
                put(EMAIL, email)
                put(PASSWORD, pass)

            }

            val jsonObjectString = jsonObject.toString()
            val requestBody =
                jsonObjectString.toRequestBody("application/json;charset=utf-8".toMediaTypeOrNull())

            if (email.isEmpty()) {
                binding.emailEditText.error = "Email tidak boleh kosong"
                return@setOnClickListener
            }
            if (pass.isEmpty()) {
                binding.passwordEditText.error = "Password tidak boleh kosong"
                return@setOnClickListener
            }
            if (pass.isNotEmpty() && email.isNotEmpty()) {
                viewModel.login(requestBody).observe(this) { result ->
                    when (result) {
                        is Result.Success -> {
                            val intent = Intent(this@LoginActivity, MainActivity::class.java)
                            intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_NEW_TASK
                            finish()
                            startActivity(intent)
                        }
                        is Result.Error -> {
                            showToast(result.error)
                        }
                        else -> {}
                    }
                }
            }
        }
    }

    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }

    private fun goToRegister() {
        val intent = Intent(this, RegisterActivity::class.java)
        startActivity(intent)
    }



    companion object {
        private const val EMAIL = "email"
        private const val PASSWORD = "password"
    }
}