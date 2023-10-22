import { ApiResponse } from "apisauce";
import { api } from "../../api/api-config"
import { UserProfile, ErrorMessageLogin } from "../../model/User";

export const getUserService = async (token: string) : Promise<ApiResponse<UserProfile, ErrorMessageLogin>> => {
    api.setHeader(
        'Authorization', "Bearer "+token
      )
    return api.get('/me');
};