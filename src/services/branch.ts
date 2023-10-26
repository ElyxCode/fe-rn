import { ApiResponse } from "apisauce";
import { api } from "../api/api-config"
import { Branch } from '../model/Branch';
import { Location } from "../model/Location";

export const branchService = async (lat: string = '13.8263447', lng: String = '-89.270477') => {
    return api.get<Branch[]>('/branchs', { lat: lat, lng: lng })
};

export const filterBranchesByCategory = async (location : Location, categoryId: string) => {
    return api.get<Branch[]>('/branchs', { lat: location.latitude, lng: location.longitude, category_id:categoryId })
}