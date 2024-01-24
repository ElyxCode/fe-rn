import { Product } from "./product";

export interface Promotion {
    id:              number;
    main:            boolean;
    title:           string;
    description:     string;
    type:            string;
    expiration_date: string;
    branch_id:       number;
    image:           string;
    products:        Product[];
}

export interface Branch {
    id:                number;
    name:              string;
    logo:              string;
    banner:            string;
    description:       null;
    delivery_time:     null;
    created_at:        string;
    updated_at:        string;
    location:          Location;
    address:           string;
    delivery_zone:     DeliveryZone[];
    phone:             string;
    schedule:          null;
    allow_cash:        boolean;
    enable:            boolean;
    active:            boolean;
    min_amount:        string;
    distance_for_free: string;
    amount_for_free:   null;
}

export interface DeliveryZone {
    lat: number;
    lng: number;
}

export interface Location {
    type:        string;
    coordinates: number[];
}

export interface Brand {
    id:          number;
    name:        string;
    description: null;
    logo:        string;
}
