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