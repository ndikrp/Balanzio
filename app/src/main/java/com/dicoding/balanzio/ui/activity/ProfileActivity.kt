package com.dicoding.balanzio.ui.activity

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.dicoding.balanzio.R
import com.dicoding.balanzio.databinding.ActivityLoginBinding
import com.dicoding.balanzio.databinding.ActivityProfileBinding
import com.dicoding.balanzio.ui.fragment.HomeFragment

class ProfileActivity : AppCompatActivity() {

    private lateinit var binding: ActivityProfileBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityProfileBinding.inflate(layoutInflater)
        setContentView(binding.root)

    }


}