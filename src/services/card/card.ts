import { ApiResponse } from "apisauce";
import { api } from "../../api/api-config"
import { Card, CardStatus } from "../../model/Card";

export const getCardsService = async (token: string) : Promise<ApiResponse<Card[]>> => {
    api.setHeader(
        'Authorization', "Bearer "+token
      )
    return api.get('/cards');
};

export const updateCardService = async (token: string, cardId: string, card: Card) : Promise<ApiResponse<Card>> => {
  api.setHeader(
      'Authorization', "Bearer "+token
    )
  return api.put(`/cards/${cardId}`, { id: card.id, name: card.name, last_numbers: card.last_numbers, verified: card.verified, active: card.active });
};

export const deleteCardService = async (token: string, cardId: string) : Promise<ApiResponse<CardStatus>> => {
  api.setHeader(
      'Authorization', "Bearer "+token
    )
  return api.delete(`/cards/${cardId}`);
};