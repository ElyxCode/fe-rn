import {googleApi} from '../../api/api-config';
import Resources from '../../constants/Resources';
import {ApiResponse} from 'apisauce';
import {GooglePlaceAutoCompleteResult} from '../../model/GooglePlaceAutoCompleteResult';
import {  GooglePlaceDetailsResponse } from '../../model/GooglePlace';

export const getPlaces = async (
  text: string,
): Promise<ApiResponse<GooglePlaceAutoCompleteResult>> => {
  const resource = `api/place/autocomplete/json?input=${text}&components=country:sv&key=${Resources.GoogleMapsApiKey}`;
  return await googleApi.get(resource);
};


   
   export const getPlaceDetails = async (placeId: string):Promise<ApiResponse<GooglePlaceDetailsResponse>> => {
     console.log(`api/place/details/json?placeid=${placeId}&key=${Resources.GoogleMapsApiKey}`)
     const resource = `api/place/details/json?placeid=${placeId}&key=${Resources.GoogleMapsApiKey}`;
     return await googleApi.get(resource);
   };
   