import { ApiResponse } from "apisauce";
import { api } from "../api/api-config"
import { Products } from '../model/product';


export const productsService = async (branchId: string): Promise<ApiResponse<Products>> => {
    return api.get('/products', { branch_id: branchId })
};

export const nextPageProductsService = async (branchId: string, page: string, categoryId: string): Promise<ApiResponse<Products>> => {

    let extractNumberPage = page.split('=')[1] ?? '';
    console.log({ extractNUmverService: extractNumberPage})

    return api.get(`/products?branch_id=${branchId}&page=${extractNumberPage}&category_id=${categoryId}`)
};

