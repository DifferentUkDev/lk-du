import { api } from "./const";

export const getBeneficiaryVerificationAttempt = (token: string | undefined, userId: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get(`/Inquiry/BeneficiaryVerificationAttempt/${userId}`).then((resp) => resp)
}