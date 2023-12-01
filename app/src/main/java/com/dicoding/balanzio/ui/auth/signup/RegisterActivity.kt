package com.dicoding.balanzio.ui.auth.signup

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
import com.dicoding.balanzio.R
import com.dicoding.balanzio.ViewModelFactory
import com.dicoding.balanzio.databinding.ActivityRegisterBinding
import com.dicoding.balanzio.ui.auth.login.LoginActivity
import com.dicoding.balanzio.data.Result

class RegisterActivity : AppCompatActivity() {

    private  val viewModel by viewModels<RegisterViewModel> {
        ViewModelFactory.getInstance(this)
    }
    private lateinit var binding: ActivityRegisterBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding =ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val tvKlikMasuk = findViewById<View>(R.id.tv_klik_masuk )
        tvKlikMasuk.setOnClickListener {
            goToLogin()
        }

        setupView()
        setupAction()

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
        binding.signupButton.setOnClickListener {
            val name = binding.nameEditText.text.toString()
            val email = binding.emailEditText.text.toString()
            val pass = binding.passwordEditText.text.toString()
            val jk = binding.jenisKelaminEditText.text.toString()
            val bbStr = binding.bbEditText.text.toString()
            val tbStr = binding.tbEditText.text.toString()
            val ageStr = binding.umurEditText.text.toString()

            // Konversi string menjadi integer
            val bb: Int = if (bbStr.isNotEmpty()) bbStr.toInt() else 0
            val tb: Int = if (tbStr.isNotEmpty()) tbStr.toInt() else 0
            val age: Int = if (ageStr.isNotEmpty()) ageStr.toInt() else 0


            if (name.isEmpty()){
                binding.nameEditText.error = "Nama tidak boleh kosong"
                return@setOnClickListener
            }
            if (email.isEmpty()){
                binding.emailEditText.error = "Email tidak boleh kosong"
                return@setOnClickListener
            }
            if (pass.isEmpty()){
                binding.passwordEditText.error = "Password tidak boleh kosong"
                return@setOnClickListener
            }
            if (bbStr.isEmpty()){
                binding.bbEditText.error = "Berat Badan tidak boleh kosong"
                return@setOnClickListener
            }
            if (tbStr.isEmpty()){
                binding.tbEditText.error = "Tinggi Badan tidak boleh kosong"
                return@setOnClickListener
            }
            if (jk.isEmpty()){
                binding.jenisKelaminEditText.error = "Jenis Kelamin tidak boleh kosong"
                return@setOnClickListener
            }
            if (ageStr.isEmpty()){
                binding.umurEditText.error = "Umur tidak boleh kosong"
                return@setOnClickListener
            }
            if (name.isNotEmpty()&& pass.isNotEmpty()&& email.isNotEmpty()){
                viewModel.register(name,email,pass, jk, bb, tb, age).observe(this){result ->
                    when(result){
                        is Result.Success ->{
//                            showLoading(false)
                            AlertDialog.Builder(this).apply {
                                setTitle("Registrasi Success")
                                setMessage("Akun dengan $email sudah jadi nih. Yuk, login dan upload cerita mu")

                                create()
                                show()
                            }
                            startActivity(Intent(this, LoginActivity::class.java))
                        }
                        is Result.Error ->{
//                            showLoading(false)
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

    private fun goToLogin() {
        val intent = Intent(this, LoginActivity::class.java)
        startActivity(intent)
    }
}