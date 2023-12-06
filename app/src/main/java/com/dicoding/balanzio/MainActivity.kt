package com.dicoding.balanzio

import android.content.Intent
import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.dicoding.balanzio.databinding.ActivityMainBinding
import com.dicoding.balanzio.ui.fragment.GoalsFragment
import com.dicoding.balanzio.ui.fragment.HistoryFragment
import com.dicoding.balanzio.ui.fragment.HomeFragment
import com.dicoding.balanzio.ui.fragment.ResepFragment
import com.dicoding.balanzio.ui.splash.SplashscreenActivity

class MainActivity : AppCompatActivity() {

    private val viewModel by viewModels<MainViewModel> {
        ViewModelFactory.getInstance(this)
    }
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        replaceFragment(HomeFragment())

//        viewModel.getSession().observe(this) { user ->
//            if (!user.isLogin) {
//                startActivity(Intent(this, SplashscreenActivity::class.java))
//                finish()
//            }
//        }

        binding.bottomNavigationView.setOnItemSelectedListener {
            when(it.itemId){
                R.id.home -> replaceFragment(HomeFragment())
                R.id.history -> replaceFragment(HistoryFragment())
                R.id.resep -> replaceFragment(ResepFragment())
                R.id.goals -> replaceFragment(GoalsFragment())

                else ->{

                }
            }
            true
        }
    }

    private fun replaceFragment(fragment: Fragment){
        val fragmentManager = supportFragmentManager
        val fragmentTransaction = fragmentManager.beginTransaction()
        fragmentTransaction.replace(R.id.frame_layout, fragment)
        fragmentTransaction.commit()
    }
}
