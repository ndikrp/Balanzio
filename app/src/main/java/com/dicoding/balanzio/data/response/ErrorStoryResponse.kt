package com.dicoding.balanzio.data.response

import com.google.gson.annotations.SerializedName

data class ErrorStoryResponse(

	@field:SerializedName("error")
	val error: Boolean? = null,

	@field:SerializedName("message")
	val message: String? = null
)
