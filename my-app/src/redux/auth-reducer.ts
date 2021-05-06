import {ECodes, ECaptcha} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {CommonDispatch, InferActionsType} from "./redux-store";

let initialState: {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null,
} = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};
const actions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA',
        payload: {
            id,
            email,
            login,
            isAuth
        }
    } as const),
    setCaptchaUrl: (captchaUrl: string) => ({
        type: 'GET_CAPTCHA_URL_SUCCESS',
        payload: { captchaUrl }
    } as const),
};

type InitialState = typeof initialState;
type ActionTypes = InferActionsType<typeof actions>;
type TDispatch = CommonDispatch<ActionTypes | FormAction>;

const authReducer = (state = initialState, action: ActionTypes): InitialState => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS': {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
};

export const auth = (): TDispatch =>
    async (dispatch) => {
        let authData = await authAPI.auth();

        if (authData.resultCode === ECodes.SUCCESS) {
            let {id, email, login} = authData.data;
            dispatch(actions.setAuthUserData(id, email, login, true));
        }

    };

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): TDispatch => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha);

    if (loginData.resultCode === ECodes.SUCCESS) {
        dispatch(auth());
    } else {

        if(loginData.resultCode === ECaptcha.CAPTCHA_IS_REQUIRED) {
            dispatch(getCaptchaUrl());
        }

        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
        dispatch(stopSubmit('login', {_error: message}));
    }
};

export const getCaptchaUrl = (): TDispatch => async (dispatch) => {
    let captchaData = await securityAPI.requestCaptchaUrl();

    dispatch(actions.setCaptchaUrl(captchaData.url));
};

export const logout = (): TDispatch => async (dispatch) => {
    let logoutData = await authAPI.logout();

    if (logoutData.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }

};

export default authReducer;
