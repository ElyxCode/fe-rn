import { ApiResponse } from "apisauce";
import { api } from "../api/api-config"
import { Order, ReviewOrderResponse } from "../model/Order";

export const getOrdersService = async (token: string) : Promise<ApiResponse<Order[]>> => {
    api.setHeader(
        'Authorization', "Bearer "+token
      )
    return api.get('/orders');
};

export const ratingOrderService = async (token: string, orderId: string, rating: string, comment: string) : Promise<ApiResponse<ReviewOrderResponse>> => {
  api.setHeader(
      'Authorization', "Bearer "+token
    )
  return api.post('/reviews', {
    order_id: orderId,
    value: rating,
    comments: comment
  });
};