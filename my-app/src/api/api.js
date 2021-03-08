import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        'API-KEY': "8c9ba98e-b3c1-4f12-bbc3-ef13dd1018cc"
    },
});

export const userAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    follow(id) {
        return instance.post(`follow/${id}`, {},{})
            .then(response => response.data)
    },
    unfollow(id) {
        return instance.delete(`follow/${id}`, {},{})
            .then(response => response.data)
    },
    getProfile(userId) {
        console.warn('Obsolete method.Use profileAPI object');
        return profileAPI.getProfile(userId);
    }
};

export const profileAPI = {
    getProfile(userId) {
        return instance.get('/profile/' + userId);
    },
    getUserStatus(status) {
        return instance.get('profile/status/' + status);
    },
    updateUserStatus(status) {
        return instance.put('profile/status', { status })
    },
};

export const authAPI = {
    auth() {
        return instance.get('auth/me');
    },
    login(email, password, rememberMe = false, captcha = "") {
        return instance.post('auth/login', { email, password, rememberMe, captcha});
    },
    logout() {
        return instance.delete('auth/login');
    },
};

export const securityAPI = {
    requestCaptchaUrl() {
        return instance.get('/security/get-captcha-url');
    },
};
