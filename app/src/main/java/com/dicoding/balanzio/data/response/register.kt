package com.dicoding.balanzio.data.response

import com.google.gson.annotations.SerializedName

data class Register(

	@field:SerializedName("name")
	val name: String? = null,

	@field:SerializedName("password")
	val password: String? = null,

	@field:SerializedName("gender")
	val gender: String? = null,

	@field:SerializedName("weight")
	val weight: Int? = null,

	@field:SerializedName("age")
	val age: Int? = null,

	@field:SerializedName("email")
	val email: String? = null,

	@field:SerializedName("height")
	val height: Int? = null,

	@field:SerializedName("error")
	val error: Boolean? = null,

	@field:SerializedName("message")
	val message: String? = null


)
