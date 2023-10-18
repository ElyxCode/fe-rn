import { api } from "../api/api-config"
import { Category } from '../model/Category';

export const categoryServices = async () => {
    return api.get<Category[]>('/categories');
}