import {TAppState} from "../redux/redux-store";

export const userLoginSelector = (state: TAppState) => {
    return state.auth.login;
};
export const isUserAuthSelector = (state: TAppState) => {
    return state.auth.isAuth;
};
