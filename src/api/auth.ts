import { api } from "./const";

export const loginBeneficiary = (email: string, password: string) => {
    return api.post('/Auth/LoginBeneficiary', {email, password})
}

