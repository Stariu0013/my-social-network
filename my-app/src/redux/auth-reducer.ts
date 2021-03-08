import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";

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

type InitialState = typeof initialState;

const authReducer = (state = initialState, action: ActionTypes): InitialState => {
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

type ActionTypes = SetAuthUserDataType | StyCaptchaUrlType ;

type SetAuthUserDataPayloadType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataPayloadType
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataType => {
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

type StyCaptchaUrlType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string}
}
export const setCaptchaUrl = (captchaUrl: string): StyCaptchaUrlType => {
    return  {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: { captchaUrl }
    }
};

export const auth = () =>
    async (dispatch: any) => {
        let response = await authAPI.auth()

        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }

    };

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
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

export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await securityAPI.requestCaptchaUrl();

    console.log(response);
    dispatch(setCaptchaUrl(response.data.url));
};

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }

};

export default authReducer;
