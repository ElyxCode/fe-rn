import { ApiResponse } from "apisauce";
import { api } from "../../api/api-config"
import { Order, OrderCreateErrorResponse, OrderCreateResponse, OrderRequestDTO, ReviewOrderResponse } from "../../model/Order";

export const getOrdersService = async (token: string) : Promise<ApiResponse<Order[]>> => {
    api.setHeader(
        'Authorization', "Bearer "+token
      )
    return api.get('/orders');
};

export const getOrderByIdService = async (token: string, orderId?: string) : Promise<ApiResponse<Order>> => {
  api.setHeader(
      'Authorization', "Bearer "+token
    )
  return api.get(`/order/${orderId}`);
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

export const createOrderService = async (token: string, orderRequest: OrderRequestDTO): Promise<ApiResponse<OrderCreateResponse|OrderCreateErrorResponse>> => {
  api.setHeader(
    'Authorization', "Bearer "+token
  )
return api.post('/order', {
  branch_id: orderRequest.branchId,
  address_id: orderRequest.addressId,
  coupon_code: orderRequest.couponCode,
  method: orderRequest.method,
  file_id: orderRequest.fileId,
  items: orderRequest.products,
  card_id: orderRequest.cardId,
  card: orderRequest.card,
  billing_information: orderRequest.billInfo,
  phone: orderRequest.phone,
  card_month: orderRequest.cardMonth,
  card_year: orderRequest.cardYear
});
}