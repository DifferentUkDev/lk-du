import { api } from "./const";

export const registerBeneficiaries = (
    firstName: string, 
    lastName: string, 
    age: number, 
    maritalStatus: number, 
    geo: string, 
    geoFrom: string,
    dateOfDeparture: string, 
    socialStatus: number, 
    email: string, 
    password: string,
    phone: string
) => {
    return api.post('/Auth/RegisterBeneficiary', {firstName, lastName, age, maritalStatus, geo, geoFrom, dateOfDeparture, socialStatus, email, password, phone}).then((resp) => resp)
}