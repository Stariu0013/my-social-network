import {APIResponse, ECaptcha, ECodes, instance} from "./api";

export type TAuth = {
    id: number,
    email: string,
    login: string,
};

type TLogin = {
    userId: number,
}

export const authAPI = {
    auth() {
        return instance.get<APIResponse<TAuth>>('auth/me')
            .then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha = "") {
        return instance.post<APIResponse<TLogin, ECodes | ECaptcha>>('auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data);
    },
    logout() {
        return instance.delete<APIResponse>('auth/login')
            .then(res => res.data);
    },
};
