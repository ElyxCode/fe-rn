import { ApiResponse } from "apisauce";
import { api } from "../../api/api-config"
import { Card, CardRequest, CreateCardResponse, CardStatus, CreateCardResponseError } from "../../model/Card";

export const getCardsService = async (token: string) : Promise<ApiResponse<Card[]>> => {
    api.setHeader(
        'Authorization', "Bearer "+token
      )
    return api.get('/cards');
};

export const createCardService = async (token: string, cardRequest: CardRequest ) : Promise<ApiResponse<CreateCardResponse,CreateCardResponseError>> => {
  api.setHeader(
      'Authorization', "Bearer "+token
    )
  return api.post(`/cards`, { name: cardRequest.name, number: cardRequest.number, month: cardRequest.month, year: cardRequest.year, cvc: cardRequest.cvc });
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

export const validationCardService = async (token: string, cardId: string,cardMonth: string, cardYear: string) : Promise<ApiResponse<string|any>> => {
  api.setHeader(
      'Authorization', "Bearer "+token
    )
  return api.post('/cards-verify',{
    id: cardId,
    month: cardMonth,
    year: cardYear
  });
};

