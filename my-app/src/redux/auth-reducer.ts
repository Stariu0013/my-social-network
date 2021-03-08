import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
};

export const setAuthUserData = (id, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        payload: {
            id,
            email,
            login,
            isAuth
        }
    }
};

export const setCaptchaUrl = (captchaUrl) => {
    return  {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: { captchaUrl }
    }
};

export const auth = () =>
    async dispatch => {
        let response = await authAPI.auth()

        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }

    };

export const login = (email, password, rememberMe, captcha) => async dispatch => {
    let response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.data.resultCode === 0) {
        dispatch(auth());
    } else {

        if(response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }

        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit('login', {_error: message}));
    }
};

export const getCaptchaUrl = () => async dispatch => {
    let response = await securityAPI.requestCaptchaUrl();

    console.log(response);
    dispatch(setCaptchaUrl(response.data.url));
};

export const logout = () => async dispatch => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }

};

export default authReducer;
