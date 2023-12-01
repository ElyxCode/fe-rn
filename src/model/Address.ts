import { Location } from "./Location";

export interface Address{
    id:number;
    name:string;
    address:string;
    block:string;
    comments:string;
    slope:string;
    road:string;
    location:Location;
    active:boolean;
    
} 