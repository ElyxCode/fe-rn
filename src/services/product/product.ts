import {ApiResponse} from 'apisauce';
import {api} from '../../api/api-config';
import {ProductResponse} from '../../model/product';

export const productsService = async (
  branchId: string,
): Promise<ApiResponse<ProductResponse>> => {
  return api.get('/products', {branch_id: branchId});
};

export const nextPageProductsService = async (
  branchId: string,
  page: string,
  categoryId: string,
): Promise<ApiResponse<ProductResponse>> => {
  // extrae de la url el numero de pagina TODO: se debe poder mejorar esto
  let extractNumberPage = page.split('=')[1] ?? '';

  return api.get(
    `/products?branch_id=${branchId}&page=${extractNumberPage}&category_id=${categoryId}`,
  );
};

export const getProductByCategoryService = async (
  branchId: string,
  categoryId: string,
): Promise<ApiResponse<ProductResponse>> => {
  return api.get(`/products?branch_id=${branchId}&category_id=${categoryId}`);
};

export const searchProductByProductName = async (
  branchId: string,
  text: string,
): Promise<ApiResponse<ProductResponse>> => {
  return api.get(`/products?branch_id=${branchId}&search=${text}`);
};
