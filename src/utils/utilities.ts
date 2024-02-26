import { isAndroid } from "../constants/Platform";
import { Order } from "../model/Order";

export const dateFormatPattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
export const phoneFormatPattern = /^(?!\s*$)[0-9\s]{8}$/;
export const emailFormatPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const expirationCardPattern = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/gm;
export const cvvPattern = /^[0-9]{3}$/;
export const cardsPattern = /(?<!\d)\d{16}(?!\d)|(?<!\d[ _-])(?<!\d)\d{4}(?=([_ -]))(?:\1\d{4}){3}(?![_ -]?\d)/;
export const passwordPatternValidation = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
export const documentNumberPatternValidation = /\d{9}/;

export const clearObjectUserData = (user: any): any => {
    const {message, ...userProp} = user;
    return userProp;
};

export const normalizeCardNumber = (value: string): string => {
    return (
      value
        .replace(/\s/g, '')
        .replace(/[-—]+/g, '')
        .replace(/[,.]+/g, '')
        .match(/.{1,4}/g)
        ?.join(' ')
        .substring(0, 19) || ''
    );
};

export const normalizeExpirationCard = (value: string): string => {
    return value.replace(/\//g, "").replace(/[-—]+/g, '')
    .replace(/[,.]+/g, '').substring(0, 2) + 
            (value.length > 2 ? '/' : '') + 
            value.replace(/\//g, "").replace(/[-—]+/g, '')
            .replace(/[,.]+/g, '').substring(2, 4);
};

export const normalizeCvvCard = (value: string): string => {
    if(value.length > 3){
        return value.replace(/\s/g, '')
        .replace(/[-—]+/g, '')
        .replace(/[,.]+/g, '').substring(0, 3);
    }
    return value.replace(/\s/g, '')
    .replace(/[-—]+/g, '')
    .replace(/[,.]+/g, '');
};

export const transformBirthDateToSend = (dateFormat: string): string => {
    let date: string[] = dateFormat.split('/');
    // console.log(date[2] + '-' + date[1] + '-' + date[0]);
    return date[2] + '-' + date[1] + '-' + date[0];
};

export const transformBirthDateUTCTtoDDMMYYYY = (dateFormat: string): string => {
    if(dateFormat === '') return '';
    let date: string[] = dateFormat.split('T');  
    let dateT: string[] = date[0].split('-');    
    let year: string = dateT[0];
    let month: string = dateT[1];
    let day: string = dateT[2];
    return day + '/' + month+ '/' + year;
};

export const getDistanceUserToBranch = (branchLocationLat: number, branchLocationLng: number, userLocationLat: number, userLocationLng: number, unit: string = 'K'): number => {
    let branchLat: number = Math.PI * branchLocationLat / 180;
    let currentAddressLat: number = Math.PI * userLocationLat / 180;
    let theta: number = branchLocationLng - userLocationLng;
    let rtheta: number = Math.PI * theta / 180;
    let dist: number =
        Math.sin(branchLat) * Math.sin(currentAddressLat) + Math.cos(branchLat) *
        Math.cos(currentAddressLat) * Math.cos(rtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;

    switch (unit)
    {
        case 'K': //Kilometers -> default
            return dist * 1.609344;
        case 'N': //Nautical Miles 
            return dist * 0.8684;
        case 'M': //Miles
            return dist;
    }

    return dist;
}

export const getOrderState = (orderState: string): string => {
    if (orderState === null || orderState === '') return '';

    let state: string = orderState;
    switch (state)   {
        case "creado":
            return "Orden recibida";           
        case "aceptado":
            return "Orden confirmada";           
        case "rechazado":
            return "Orden no entregada";            
        case "asignado":
            return "Transporte asignado";           
        case "entregado":
            return "Orden entregada";            
        case "cancelado":
            return "Orden no entregada";          
        case "preparando":
            return "En proceso de preparación";           
        case "camino":
            return "Orden en camino";          
    }
            return "";
}

export const paymentMethodFormat = (order: Order) => {
    if (order.transaction != null)
    {
        switch (order.transaction.method)
        {
            case "card":
                return "Tarjeta";
                
            case "transfer":
                return "Transferencia";

            case "cash":
                return "Efectivo";
                
            default:
                return "";               
        }
    }
}

// convierte numero en formato de moneda USD
export const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
}); 

export const passwordValidation = (userPassword: string) =>
{
    return passwordPatternValidation.test(userPassword);
}

export const getPlatformDevice = (): string => {
    return isAndroid ? 'android' : 'ios'
}

export const clearCommaNumber = (amount: string): string => {
    return amount.replace(/\,/g, '');
}

export const removeFormatDui = (value: string): string => {
    if(value.includes('-')){
        value.replace('-','');
    }
    return value
} 