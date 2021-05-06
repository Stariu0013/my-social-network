import {instance} from "./api";

type TCaptcha = {
    url: string,
}

export const securityAPI = {
    requestCaptchaUrl() {
        return instance.get<TCaptcha>('/security/get-captcha-url')
            .then(res => res.data);
    },
};
