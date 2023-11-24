interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }
  
  interface GeometryLocation {
    lat: number;
    lng: number;
  }
  
  interface GeometryViewport {
    northeast: GeometryLocation;
    southwest: GeometryLocation;
  }
  
  interface Geometry {
    location: GeometryLocation;
    location_type: string;
    viewport: GeometryViewport;
  }
  
  interface Result {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: Geometry;
    place_id: string;
    types: string[];
  }
  
  interface PlusCode {
    compound_code: string;
    global_code: string;
  }
  
 export interface GoogleReverseGeocodingResponse {
    plus_code: PlusCode;
    results: Result[];
    status: string;
  }