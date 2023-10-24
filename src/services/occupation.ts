
import { ApiResponse } from "apisauce";
import { api } from "../api/api-config"
import { Occupation } from "../model/User";

export const occupationsService = async (): Promise<ApiResponse<Occupation[]>> => {
    return api.get('/occupations')
};