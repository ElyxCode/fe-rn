import { ApiResponse } from "apisauce"
import { api } from "../../api/api-config"
import { ErrorMessageLogin, SignupResponse, User } from "../../model/User"

export const loginServices = async (email: string, password: string) : Promise<ApiResponse<User, ErrorMessageLogin>>=>  {
    return api.post('/auth/login', { email: email, password: password})
}

export const signUpServices = async (name: string, email: string, phone: string, password: string) : Promise<ApiResponse<SignupResponse>>=>  {
    return api.post('/auth/signup', { name: name, email: email, phone: phone, password: password, dui: null})
}