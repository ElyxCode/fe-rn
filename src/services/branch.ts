import { ApiResponse } from "apisauce";
import { api } from "../api/api-config"
import { Branch } from '../model/Branch';

export const BranchService = async (lat: string = '13.8263447', lng: String = '-89.270477') => {
    return api.get<Branch[]>('/branchs', { lat: lat, lng: lng })
};