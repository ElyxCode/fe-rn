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