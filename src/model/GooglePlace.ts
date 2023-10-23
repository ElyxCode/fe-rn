interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }
  
  interface GeometryLocation {
    lat: number;
    lng: number;
  }
  
  interface Northeast {
    lat: number;
    lng: number;
  }
  
  interface Southwest {
    lat: number;
    lng: number;
  }
  
  interface Viewport {
    northeast: Northeast;
    southwest: Southwest;
  }
  
  interface Photo {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }
  
  interface Review {
    author_name: string;
    author_url: string;
    language: string;
    original_language: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
    translated: boolean;
  }
  
  interface GooglePlaceResult {
    address_components: AddressComponent[];
    adr_address: string;
    business_status: string;
    formatted_address: string;
    formatted_phone_number: string;
    geometry: {
      location: GeometryLocation;
      viewport: Viewport;
    };
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    international_phone_number: string;
    name: string;
    photos: Photo[];
    place_id: string;
    rating: number;
    reference: string;
    reviews: Review[];
    types: string[];
    url: string;
    user_ratings_total: number;
    utc_offset: number;
    vicinity: string;
    wheelchair_accessible_entrance: boolean;
  }
  
  export interface GooglePlaceDetailsResponse {
    html_attributions: any[];
    result: GooglePlaceResult;
    status: string;
  }