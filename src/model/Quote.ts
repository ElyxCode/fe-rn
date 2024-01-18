import { Product } from "./product";

export interface Quote {
    branchId:  string;
    addressId: string;
    discountCode: string;
    products: Product[]
}

export interface QuoteResponse {
    items:                  Product[];
    weight:                 number;
    distance:               string;
    transport:              string;
    discount:               string;
    subtotal:               string;
    subtotal_with_discount: string;
    promo:                  string;
    coupon_valid:           boolean;
    total:                  string;
    special_discount:       boolean;
}

export interface QuoteResponseError {
    errors: Errors;
}

export interface Errors {
    address_id: string;
}
