import { ApiResponse } from "apisauce";
import { api } from "../api/api-config"
import { Branch } from '../model/Branch';
import { Location } from "../model/Location";

export const branchService = async (lat: string = '13.8263447', lng: String = '-89.270477'): Promise<ApiResponse<Branch[]>> => {
    return api.get('/branchs', { lat: lat, lng: lng })
};

export const filterBranchesByCategory = async (location : Location, categoryId: string) => {
    return api.get<Branch[]>('/branchs', { lat: location.lat, lng: location.lng, category_id:categoryId })
}

export const branchByIdService = async (branchId: string): Promise<ApiResponse<Branch>> => {
    return api.get(`/branch/${branchId}`)
};