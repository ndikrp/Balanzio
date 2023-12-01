package com.dicoding.balanzio.data


import androidx.lifecycle.LiveData
import androidx.lifecycle.liveData
import com.dicoding.balanzio.data.pref.UserModel
import com.dicoding.balanzio.data.pref.UserPreference
import com.dicoding.balanzio.data.response.Register
import com.dicoding.balanzio.data.response.ErrorStoryResponse
import com.dicoding.balanzio.remote.ApiService
import com.google.gson.Gson
import kotlinx.coroutines.flow.Flow
import retrofit2.HttpException

class UserRepository private constructor(
    private val apiService: ApiService,
    private val userPreference: UserPreference
){
    suspend fun saveSession(user: UserModel) {
        userPreference.saveSession(user)
    }

    fun getSession(): Flow<UserModel> {
        return userPreference.getSession()
    }

    suspend fun logout() {
        userPreference.logout()
    }

    fun userRegistrasi(
        name: String,
        email: String,
        password: String,
        gender: String,
        weight: Int,
        height: Int,
        age: Int
    ): LiveData<Result<Register>> = liveData {
        emit(Result.Loading)
        try {
            val response = apiService.register(name, email, password, gender, weight, height, age)
            if (response.error == false) {
                emit(Result.Success(response))
            } else {
                emit(Result.Error(response.message ?: "An error occurred"))
            }
        } catch (e: HttpException) {
            val jsonInString = e.response()?.errorBody()?.string()
            val errorBody = Gson().fromJson(jsonInString, ErrorStoryResponse::class.java)
            val errorMessage = errorBody?.message ?: "An error occurred"
            emit(Result.Error("Registration failed: $errorMessage"))
        } catch (e: Exception) {
            emit(Result.Error("Internet Issues"))
        }
    }


    companion object {
        @Volatile
        private var instance: UserRepository? = null
        fun getInstance(
            apiService: ApiService,
            userPreference: UserPreference
        ): UserRepository =
            instance ?: synchronized(this) {
                instance ?: UserRepository(apiService, userPreference)
            }.also { instance = it }
    }
}