import { create } from 'apisauce'

const base_url_dev = 'https://devapi.ferreplace.com/api';
const google_api_url = 'https://maps.googleapis.com/maps/';

export const api = create({
    baseURL: base_url_dev,
});

export const googleApi = create({
   baseURL:google_api_url
});



