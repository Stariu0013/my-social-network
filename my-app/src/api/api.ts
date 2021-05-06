import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        'API-KEY': "4c45f27f-22a4-45d3-84cb-87edd355a095"
    },
});

export enum ECodes {
    SUCCESS = 0,
    ERROR = 1,
}

export enum ECaptcha {
    CAPTCHA_IS_REQUIRED = 10,
}
/**
 * D - Data
 * RC - Result Code
 * */
export type APIResponse<D = {}, RC = ECodes> = {
    data: D,
    resultCode: RC,
    messages: string[],
}
