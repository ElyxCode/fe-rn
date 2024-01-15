import { ApiResponse } from "apisauce";
import { api } from "../api/api-config"
import { Bank } from "../model/bank";

export const getBanksService = async (): Promise<ApiResponse<Bank[]>> => {
    return api.get('/banks')
};