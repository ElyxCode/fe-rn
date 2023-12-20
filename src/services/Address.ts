import { ApiResponse } from "apisauce";
import { api } from "../api/api-config";


import {useAppSelector} from '../hooks/useRedux';
import { Address, AddressResponse } from "../model/Address";



export const ReadAll = async (token: string): Promise<ApiResponse<Address[]>> => {
     api.setHeader(
        'Authorization', "Bearer "+token
      )
    return api.get('/addresses')
};

export const DeleteAddress = async (token: string, addresId:string) => {
  api.setHeader(
     'Authorization', "Bearer "+token
   )
 return api.delete('/addresses/'+addresId)
};

export const CreateAddress = async (token: string,address: Address):Promise<ApiResponse<AddressResponse>> => {
  api.setHeader(
     'Authorization', "Bearer "+token
   )

   const {location }= address;
   console.log(JSON.stringify(location))
   
   const { lat, lng } = location;
   
 return api.post('/addresses',{ name: address.name, address: address.address, slope:address.slope, 
  road:address.road, comments:address.comments, latitude: lat,
   longitude:lng,active: address.active })
};

export const UpdateAddress = async (token: string,address: Address):Promise<ApiResponse<AddressResponse>> => {
  api.setHeader(
     'Authorization', "Bearer "+token
   )
   
   
   const {location }= address;

   console.log(JSON.stringify(location))

   const { lat, lng } = location;
   
   
 return api.put('/addresses/'+ address.id,{ id:address.id, name: address.name, address: address.address, slope:address.slope, 
  road:address.road, comments:address.comments, latitude: lat,
   longitude:lng , active: address.active})
};

