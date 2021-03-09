import axios from "axios";
import {TProfile, UserType} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        'API-KEY': "8c9ba98e-b3c1-4f12-bbc3-ef13dd1018cc"
    },
});

type TGetUsers = {
    items: UserType[],
    totalCount: number,
    error: string,
}

type TFollowUnfollow = {
    data: {},
    resultCode: ECodes,
    messages: string[],
}

export const userAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<TGetUsers>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    follow(id: number) {
        return instance.post<TFollowUnfollow>(`follow/${id}`, {},{})
            .then(response => response.data)
    },
    unfollow(id: number) {
        return instance.delete<TFollowUnfollow>(`follow/${id}`, {})
            .then(response => response.data)
    },
    getProfile(userId: number) {
        console.warn('Obsolete method.Use profileAPI object');
        return profileAPI.getProfile(userId);
    }
};

type TUpdateStatus = {
    data: {},
    resultCode: ECodes,
    messages: string[],
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<TProfile>('/profile/' + userId);
    },
    getUserStatus(userId: number) {
        return instance.get('profile/status/' + userId);
    },
    updateUserStatus(status: string) {
        return instance.put<TUpdateStatus>('profile/status', { status })
            .then(res => res.data);
    },
};

export enum ECodes {
    SUCCESS = 0,
    ERROR = 1,
}
export enum ECaptcha {
    CAPTCHA_IS_REQUIRED = 10,
}

type TAuth = {
    data: {
        id: number,
        email: string,
        login: string,
    },
    resultCode: ECodes,
    messages: string[],
}
type TLogin = {
    data: {
       userId: number,
    },
    resultCode: ECodes | ECaptcha,
    messages: string[],
}
type TLogout = {
    data: {},
    resultCode: ECodes,
    messages: string[],
}

export const authAPI = {
    auth() {
        return instance.get<TAuth>('auth/me')
            .then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha = "") {
        return instance.post<TLogin>('auth/login', { email, password, rememberMe, captcha})
            .then(res => res.data);
    },
    logout() {
        return instance.delete<TLogout>('auth/login')
            .then(res => res.data);
    },
};

type TCaptcha = {
    url: string,
}

export const securityAPI = {
    requestCaptchaUrl() {
        return instance.get<TCaptcha>('/security/get-captcha-url')
            .then(res => res.data);
    },
};
