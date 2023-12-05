package com.dicoding.balanzio.data.response

import com.google.gson.annotations.SerializedName

data class Login(

    @field:SerializedName("status")
    val status: Int,

    @field:SerializedName("success")
    val error: Boolean? = null,

    @field:SerializedName("message")
    val message: String? = null
)