import { create } from 'apisauce'
import config from 'react-native-config';

const base_url_dev = config.API_BASE_URL ?? '';
const google_api_url = config.GOOGLE_API_URL ?? '';

export const api = create({
    baseURL: base_url_dev,
    headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },

});

export const googleApi = create({
   baseURL: google_api_url
});



