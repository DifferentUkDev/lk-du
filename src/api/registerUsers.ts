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

export const registerVoulontee = (
    firstName: string,
    lastName: string,
    age: number,
    ageType: number,
    geo: string,
    helpTypeMask: number,
    description: string,
    email: string,
    phone: string,
    comment: string,
    status: number,
) => {
    return api.post('/Inquiry/VolunteerVerification', {
        firstName,
        lastName,
        age,
        ageType,
        geo,
        helpTypeMask,
        description,
        email,
        phone,
        comment,
        status
    }).then((resp) => resp)
}

export const registerPartner = (
    fullName: string,
    legalType: string,
    registrationDate: string,
    registrationCity: string,
    inn: string,
    kpp: string,
    ogrn: string,
    webSite: string,
    reportLink: string,
    description: string,
    contactFullName: string,
    contactPhone: string,
    contactEmail: string,
    helpTypeMask: number,
    comment: string,
) => {
    return api.post('/Inquiry/PartnerVerification', {
        fullName,
        legalType,
        registrationDate,
        registrationCity,
        inn,
        kpp,
        ogrn,
        webSite,
        reportLink,
        description,
        contactFullName,
        contactPhone,
        contactEmail,
        helpTypeMask,
        comment,
    }).then((resp) => resp)
}