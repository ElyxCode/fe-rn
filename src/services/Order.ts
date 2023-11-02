import { ApiResponse } from "apisauce";
import { api } from "../api/api-config"
import { Order } from "../model/Order";

export const getOrdersService = async (token: string) : Promise<ApiResponse<Order[]>> => {
    api.setHeader(
        'Authorization', "Bearer "+token
      )
    return api.get('/orders');
};