import { api } from "../api/api-config"
import { Promotion } from "../model/Promotion"

export const promotionServices = async (lat: string = '13.8263447', lng: string = '-89.270477', type: string = 'normal') => {
    return api.get<Promotion[]>('/promos', { lat: lat, lng: lng, type: type })
}