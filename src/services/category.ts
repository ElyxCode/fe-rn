import { ApiResponse } from "apisauce";
import { api } from "../api/api-config"
import { Category } from '../model/Category';

export const categoryServices = async (): Promise<ApiResponse<Category[]>> => {
    return api.get('/categories');
}

export const categoryByBranchServices = async (branchId: string): Promise<ApiResponse<Category[]>> => {
    return api.get('/categories', { branch_id: branchId});
}

