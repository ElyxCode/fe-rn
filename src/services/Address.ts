import { ApiResponse } from "apisauce";
import { api } from "../api/api-config";


import {useAppSelector} from '../hooks/useRedux';
import { Address } from "../model/Address";



export const ReadAll = async (token: string): Promise<ApiResponse<Address[]>> => {
    

    api.setHeader(
        'Authorization', "Bearer "+token
      )
    return api.get('/addresses')
};