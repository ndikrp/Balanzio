package com.dicoding.balanzio.remote

import com.dicoding.balanzio.data.response.Register
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST

interface ApiService {
    @FormUrlEncoded
    @POST("register")
    suspend fun register(
        @Field("name") name: String,
        @Field("email") email: String,
        @Field("password") password: String,
        @Field("gender") gender: String,
        @Field("weight") weight:Int,
        @Field("height") height:Int,
        @Field("age") age:Int
    ): Register
//
//    @FormUrlEncoded
//    @POST("login")
//    suspend fun loginUser(
//        @Field("email") email: String,
//        @Field("password")password: String
//    ): Login
}