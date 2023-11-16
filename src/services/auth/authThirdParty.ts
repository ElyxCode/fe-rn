import { ApiResponse } from "apisauce";
import { api } from "../../api/api-config"
import { ErrorMessageLogin, User } from "../../model/User";

export const ThirdPartyLoginService = async (provider:string,token: string) : Promise<ApiResponse<User, ErrorMessageLogin>> => {
    return api.post('/auth/social', {
        provider: provider,
        token: token
    });
};