export const transformBirthDate = (dateFormat: string): string => {
    let date: string[] = dateFormat.split('/');
    // console.log(date[2] + '-' + date[1] + '-' + date[0]);
    return date[2] + '-' + date[1] + '-' + date[0];
};