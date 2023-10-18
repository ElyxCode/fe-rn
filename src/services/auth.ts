import { ApiErrorResponse, ApiOkResponse, ApiResponse } from "apisauce"
import { api } from "../api/api-config"
import { ErrorMessageLogin, User } from "../model/User"

export const loginServices = async (email: string, password: string) : Promise<ApiResponse<User, ErrorMessageLogin>>=>  {
    return api.post('/auth/login', { email: email, password: password})
}