import { Location } from "./Location";

export interface Address{
    id:number;
    name:string;
    address:string;
    block:string;
    comments:string;
    slope:boolean;
    road:string;
    location:Location;
    active:boolean;
    
} 

export interface AddressResponse {
    status?:  string;
    address?: Address;
    errors?: any;
}

export interface AddressMessageDelete {
    message: string
}