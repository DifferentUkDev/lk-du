import { api } from "./const";

export const createBeneficiaryVerification = (
    token: string | undefined,
    numberOfAdults: number,
    numberOfChildren: number,
    numberOfOld: number,
    numberOfDisabled: number,
    numberOfPregnant: number,
    description: string,
    // documents: File[],
) => {
    // const files = Array.from(documents);
    // console.log('В таком виде добавляются в формдату', files)
    const formData = new FormData();

    // files.forEach((file, index) => {
    //     formData.append(`Files[${index}]`, file);
    // });
    formData.append('NumberOfAdults', numberOfAdults.toString());
    formData.append('NumberOfChildren', numberOfChildren.toString());
    formData.append('NumberOfOld', numberOfOld.toString());
    formData.append('NumberOfDisabled', numberOfDisabled.toString());
    formData.append('NumberOfPregnant', numberOfPregnant.toString());
    formData.append('Description', description);
    
    
    
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    api.defaults.headers.post['Content-Type'] = 'multipart/form-data';

    console.log('FORMDATA',
        formData.get('NumberOfAdults'),
        formData.get('NumberOfChildren'),
        formData.get('NumberOfOld'),
        formData.get('NumberOfDisabled'),
        formData.get('NumberOfPregnant'),
        formData.get('Description'),
        formData.get('Files[0]'),
    )
    return api.post('/Inquiry/BeneficiaryVerification', formData).then((resp) => resp)
}

export const resubmitBeneficiaryVerification = (
    token: string | undefined,
    beneficiary: {
        id: number | undefined,
        uuid: string | undefined,
        userType: number | undefined,
        userRole: number | undefined,
        token: string | undefined
    },
    numberOfAdults: number,
    numberOfChildren: number,
    numberOfOld: number,
    numberOfDisabled: number,
    numberOfPregnant: number,
    description: string,
    // documents: string[],
    comment: string,
    verificationStatus: number,
) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.post('/Inquiry/ResubmitBeneficiaryVerificationAttempt', {beneficiary, numberOfAdults, numberOfChildren, numberOfOld, numberOfDisabled, numberOfPregnant, description, comment, verificationStatus}).then((resp) => resp)
}