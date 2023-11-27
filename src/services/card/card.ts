import { ApiResponse } from "apisauce";
import { api } from "../../api/api-config"
import { Card } from "../../model/Card";

export const getCardsService = async (token: string) : Promise<ApiResponse<Card[]>> => {
    api.setHeader(
        'Authorization', "Bearer "+token
      )
    return api.get('/cards');
};

