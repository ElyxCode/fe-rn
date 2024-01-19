import { ApiResponse } from "apisauce";
import { api } from "../../api/api-config"
import { UserProfile, ErrorMessageLogin } from "../../model/User";

export const getUserService = async (token: string) : Promise<ApiResponse<UserProfile, ErrorMessageLogin>> => {
    api.setHeader(
        'Authorization', "Bearer "+token
      )
    return api.get('/me');
};

export const updateUserService = async (token: string, user: UserProfile) : Promise<ApiResponse<UserProfile, ErrorMessageLogin>> => {
    const userDataRequest = {     
        id: user.id,
        name: user.name,
        email: user.email,
        occupation_id: user?.occupation,
        dui: user.dui,
        birthday: user.birthday,
        phone: user.phone,
        nit: user.nit,
        iva: user.iva,
        bill_type: user.bill_type,
        bill_entity: user.bill_entity,
        notifications: user.notifications,
    }
    console.log({request:userDataRequest});
    api.setHeader(
        'Authorization', "Bearer "+token
      )
    return api.post('/me', {...userDataRequest});
};

export const updateNotificationService = async (token: string, user: UserProfile) : Promise<ApiResponse<UserProfile, ErrorMessageLogin>> => {
    const userDataRequest = {     
        id: user.id,
        name: user.name,
        email: user.email,
        notifications: !user.notifications,
    }
    api.setHeader(
        'Authorization', "Bearer "+token
      )
    return api.post('/me', {...userDataRequest});
};

//TODO: colocar el tipo de repuesta correcto para este servicio
export const updateDeviceIdService = async (token: string, name: string, email: string, deviceId: string, device: string) : Promise<ApiResponse<string[]>> => {
  api.setHeader(
      'Authorization', "Bearer "+token
    )
  return api.post('/me',{
    name: name,
    email: email,
    device_id: deviceId,
    device: device
  });
};

export const deleteUserService = async (token: string) : Promise<ApiResponse<string[]>> => {
  api.setHeader(
      'Authorization', "Bearer "+token
    )
  return api.delete('/me');
};