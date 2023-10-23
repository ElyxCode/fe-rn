
export interface StructuredFormatting {
    main_text: string;
    secondary_text: string;
  }
  
 export interface GooglePlaceAutoCompletePrediction {
    description: string;
    id: string;
    place_id: string;
    reference: string;
    structured_formatting: StructuredFormatting;
  }
  
 export interface GooglePlaceAutoCompleteResult {
    status: string;
    predictions: GooglePlaceAutoCompletePrediction[];
  }