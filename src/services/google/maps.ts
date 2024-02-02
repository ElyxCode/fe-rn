import config from 'react-native-config'; 

import {ApiResponse} from 'apisauce';

import {googleApi} from '../../api/api-config';

import {GooglePlaceAutoCompleteResult} from '../../model/GooglePlaceAutoCompleteResult';
import {  GooglePlaceDetailsResponse } from '../../model/GooglePlace';
import { GoogleReverseGeocodingResponse } from '../../model/GoogleReverseGeocodingResponse';

const GoogleMapsApiKey = config.GOOGLE_API_KEY ?? '';

export const getPlaces = async (
  text: string,
): Promise<ApiResponse<GooglePlaceAutoCompleteResult>> => {
  const resource = `api/place/autocomplete/json?input=${text}&components=country:sv&key=${GoogleMapsApiKey}`;
  console.log(resource,'getplace')
  return await googleApi.get(resource);
};

export const getPlaceDetails = async (placeId: string):Promise<ApiResponse<GooglePlaceDetailsResponse>> => {
  console.log(`api/place/details/json?placeid=${placeId}&key=${GoogleMapsApiKey}`)
  const resource = `api/place/details/json?placeid=${placeId}&key=${GoogleMapsApiKey}`;
  return await googleApi.get(resource);
};
   
export const getReverseGeocoding = async (
latitude: number,
longitude: number,
): Promise<ApiResponse<GoogleReverseGeocodingResponse>> => {
const resource = `api/geocode/json?latlng=${latitude},${longitude}&key=${GoogleMapsApiKey}`;
console.log(resource,'reverse')
return await googleApi.get(resource);
};