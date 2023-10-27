import { ApiResponse } from "apisauce";
import { api } from "../api/api-config"
import { Products } from '../model/product';


export const productsService = async (branchId: string): Promise<ApiResponse<Products>> => {
    return api.get('/products', { branch_id: branchId })
};

