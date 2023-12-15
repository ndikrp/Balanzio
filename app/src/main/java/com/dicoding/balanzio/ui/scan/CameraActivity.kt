package com.dicoding.balanzio.ui.scan

import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.WindowInsets
import android.view.WindowManager
import android.widget.Toast
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageCaptureException
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.content.ContextCompat
import com.dicoding.balanzio.databinding.ActivityCameraBinding
import com.vmadalin.easypermissions.EasyPermissions
import com.vmadalin.easypermissions.dialogs.SettingsDialog
import java.io.File
import java.text.SimpleDateFormat
import java.util.Locale

class CameraActivity : AppCompatActivity(), EasyPermissions.PermissionCallbacks {
    private lateinit var binding: ActivityCameraBinding
    private var imageCapture: ImageCapture? = null
    private var cameraSelector: CameraSelector = CameraSelector.DEFAULT_BACK_CAMERA


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityCameraBinding.inflate(layoutInflater)
        setContentView(binding.root)

        if (hasCameraPermission()){
            binding.apply {
                btClose.setOnClickListener { finish() }
                btScanFood.setOnClickListener{ takePhoto() }
//                btGaleri.setOnClickListener { toGalery()}
            }
        }
    }

    override fun onResume() {
        super.onResume()
        hideSystemUI()

        if (hasCameraPermission()) {
            startCamera()
        } else {
            requestCameraPermission()
        }
    }

    private fun hideSystemUI() {
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

    private fun startCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(this)

        cameraProviderFuture.addListener({
            val cameraProvider: ProcessCameraProvider = cameraProviderFuture.get()
            val preview = Preview.Builder().build().also {
                it.setSurfaceProvider(binding.viewFinder.surfaceProvider)
            }

            imageCapture = ImageCapture.Builder().build()
            try {
                cameraProvider.unbindAll()
                cameraProvider.bindToLifecycle(
                    this,
                    cameraSelector,
                    preview,
                    imageCapture
                )
            } catch (exc: Exception){
                Toast.makeText(
                    this@CameraActivity,
                    "Gagal memunculkan kamera",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }, ContextCompat.getMainExecutor(this))
    }

    private fun takePhoto() {
        val imageCapture = imageCapture ?: return
        val photoFile = createImageFile()
        val outputOptions = ImageCapture.OutputFileOptions.Builder(photoFile).build()

        imageCapture.takePicture(
            outputOptions,
            ContextCompat.getMainExecutor(this),
            object : ImageCapture.OnImageSavedCallback {
                override fun onImageSaved(outputFileResults: ImageCapture.OutputFileResults) {
                    handleImageSaved(photoFile)
                }

                override fun onError(exception: ImageCaptureException) {
                    onError(exception)
                }
            }
        )
    }

    private fun handleImageSaved(photoFile: File) {
        val msg = "Photo capture succeeded: ${photoFile.absolutePath}"
        Toast.makeText(baseContext, msg, Toast.LENGTH_SHORT).show()
    }

    private fun createImageFile(): File {
        val timeStamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(System.currentTimeMillis())
        val fileName = "IMG_${timeStamp}.jpg"
        val storageDirectory = getExternalFilesDir(null)
        return File(storageDirectory, fileName)
    }
    private fun hasCameraPermission(): Boolean {
        return EasyPermissions.hasPermissions(this, android.Manifest.permission.CAMERA)

    }

    override fun onPermissionsDenied(requestCode: Int, perms: List<String>) {
        if(EasyPermissions.somePermissionPermanentlyDenied(this, perms)){
            SettingsDialog.Builder(this).build().show()
        } else {
            requestCameraPermission()
        }
    }

    //CAMERA PERMISSION GRANTED ACTION
    override fun onPermissionsGranted(requestCode: Int, perms: List<String>) {
        Toast.makeText(
            this,
            "Camera Granted Permission",
            Toast.LENGTH_SHORT
        ).show()
    }

    //REQUEST CAMERA PERMISSION
    private fun requestCameraPermission() {
        EasyPermissions.requestPermissions(
            this,
            "This application need to access your camera",
            CAMERA_PERMISSION_REQUEST_CODE,
            android.Manifest.permission.CAMERA
        )
    }

    private fun onErrorM(exception: ImageCaptureException) {
        Toast.makeText(
            baseContext,
            "Photo capture failed: ${exception.message}",
            Toast.LENGTH_SHORT
        ).show()

        Log.e("CameraActivity", "Photo capture failed", exception)
    }


    companion object {
        const val CAMERA_PERMISSION_REQUEST_CODE = 100
    }


}