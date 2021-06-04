import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import { reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
});

type TRootReducer = typeof rootReducer;
export type TAppState = ReturnType<TRootReducer>

export type InferActionsType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;

export type CommonDispatch<A extends Action> = ThunkAction<Promise<void>, TAppState, unknown, A>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

export type ExtractString<T> = Extract<keyof T, string>;

// @ts-ignore
window.store = store;
export default store;
