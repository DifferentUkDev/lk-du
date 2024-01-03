import { api } from "./const";

export const createBeneficiaryVerification = (
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
    documents: string[],
    comment: string,
    verificationStatus: number,
) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.post('/Inquiry/BeneficiaryVerification', {beneficiary, numberOfAdults, numberOfChildren, numberOfOld, numberOfDisabled, numberOfPregnant, description, documents, comment, verificationStatus}).then((resp) => resp)
}