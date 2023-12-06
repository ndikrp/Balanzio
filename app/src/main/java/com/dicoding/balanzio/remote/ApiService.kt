package com.dicoding.balanzio.remote

import com.dicoding.balanzio.data.response.Login
import com.dicoding.balanzio.data.response.Register
import okhttp3.RequestBody
import retrofit2.http.Body
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST

interface ApiService {
    @POST("register")
    suspend fun register(@Body requestBody: RequestBody): Register

    @POST("login")
    suspend fun login(@Body requestBody: RequestBody): Login
//
//    @FormUrlEncoded
//    @POST("login")
//    suspend fun loginUser(
//        @Field("email") email: String,
//        @Field("password")password: String
//    ): Login
}