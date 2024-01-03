import { api } from "./const";

export const getBeneficiaryVerificationAttempt = (token: string | undefined, userId: number) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get(`/Inquiry/BeneficiaryVerificationAttempt/${userId}`).then((resp) => resp)
}