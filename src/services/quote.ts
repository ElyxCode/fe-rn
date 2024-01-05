import { ApiResponse } from "apisauce";
import { api } from "../api/api-config"
import { QuoteResponseError, QuoteResponse, Quote } from "../model/Quote";

export const quoteService = async (quote: Quote): Promise<ApiResponse<QuoteResponse|QuoteResponseError>> => {
    return api.post('/quote', { branch_id: quote.branchId, address_id: quote.addressId, coupon_code: quote.discountCode, items: quote.products })
};