import {ECodes, profileAPI, TSavePhotos, userAPI} from "../api/api";
import {TPhotos, TProfile} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {TAppState} from "./redux-store";
import {stopSubmit} from "redux-form";

const ADD_NEW_POST = "ADD-NEW-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const UPDATE_PHOTOS_SUCCESS = "UPDATE_PHOTOS_SUCCESS";
const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";

let counter = 0;
const idPrefix = '_' + Math.floor(Math.random() * 9e9).toString(36);

function generateNewUserId() {
    return idPrefix + ++counter;
}

type TPostData = {
    id: string,
    message: string,
    likesCount: number,
}

const initialState: {
    postData: TPostData[],
    profile: TProfile | null,
    status: string,
} = {
    postData: [
        {id: generateNewUserId(), message: 'Hello, there', likesCount: 15},
        {id: generateNewUserId(), message: 'What is up?', likesCount: 20},
    ],
    profile: null,
    status: '',
};

type TInitialState = typeof initialState;

const profileReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case ADD_NEW_POST: {
            let newPost: TPostData = {
                id: generateNewUserId(),
                message: action.newPost,
                likesCount: 0,
            };
            return {
                ...state,
                postData: [...state.postData, newPost],
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile,
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status,
            }
        }
        case DELETE_POST: {
            return {...state, postData: state.postData.filter(post => post.id !== action.postId)}
        }
        case UPDATE_PHOTOS_SUCCESS: {
            let newProfileState = state.profile;

            if (newProfileState) {
                newProfileState = {
                    ...newProfileState,
                    photos: action.photos,
                };
            }
            else {
                // если profile отсутствует то action игнорируем
                console.warn('empty current profile on action UPDATE_PHOTOS_SUCCESS');

                return state;
            }

            return {...state, profile: newProfileState};
        }
        default:
            return state;
    }
};

type TActions = AddNewPostType | DeletePostType | SetStatusType | SetUserProfile | TUpdatePhotos;

type AddNewPostType = {
    type: typeof ADD_NEW_POST
    newPost: string
}
export const addNewPostActionCreator = (newPost: string): AddNewPostType => {
    return {
        type: ADD_NEW_POST,
        newPost
    }
};
type DeletePostType = {
    type: typeof DELETE_POST
    postId: string
}
export const deletePost = (postId: string): DeletePostType => {
    return {
        type: DELETE_POST,
        postId
    }
};
type SetStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusType => {
    return {
        type: SET_STATUS,
        status
    }
};
type SetUserProfile = {
    type: typeof SET_USER_PROFILE
    profile: TProfile
}
export const setUserProfile = (profile: TProfile): SetUserProfile => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
};
type TUpdatePhotos = {
    type: typeof UPDATE_PHOTOS_SUCCESS,
    photos: TPhotos,
}
export const updatePhotos = (photos: TPhotos): TUpdatePhotos => {
    return {
        type: UPDATE_PHOTOS_SUCCESS,
        photos,
    }
};
type TUpdateProfile = {
    type: typeof UPDATE_PROFILE_SUCCESS,
    profile: TProfile,
}
export const updateProfileSuccess = (profile: TProfile): TUpdateProfile => {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        profile,
    }
};

type TDispatch = ThunkAction<Promise<void>, TAppState, unknown, TActions>;

export const userProfileById = (userId: number): TDispatch => {
    return async (dispatch) => {
        userAPI.getProfile(userId)
            .then(function (response: any) {
                    dispatch(setUserProfile(response.data))
                }
            );
    }
};

export const savePhotos = (file: File): TDispatch => {
    return async (dispatch) => {
        let response: TSavePhotos = await profileAPI.savePhoto(file);

        if (response.resultCode === ECodes.SUCCESS) {
            dispatch(updatePhotos(response.data.photos))
        }
    }
};
export const getStatus = (userId: number): TDispatch => {
    return async (dispatch) => {
        profileAPI.getUserStatus(userId)
            .then(function (response: any) {
                dispatch(setStatus(response.data))
            });
    }
};
export const updateStatus = (status: string): TDispatch => {
    return async (dispatch) => {
        let response = await profileAPI.updateUserStatus(status);

        if (response.resultCode === ECodes.SUCCESS) {
            dispatch(setStatus(status))
        }
    }
};
export const updateProfile = (profile: TProfile): TDispatch => {
    return async (dispatch, getState) => {
        const response = await profileAPI.saveProfile(profile);
        const userId = getState().auth.id;

        if (response.resultCode === ECodes.SUCCESS) {
            if(userId) {
                dispatch(userProfileById(userId));
            }
        }
        else {
            // todo: Не работает всплывашка об ошибке
            // @ts-ignore
            dispatch(stopSubmit('profileData',{_error: response.messages[0] }));
            return Promise.reject(response.messages[0]);
        }
    }
};

export default profileReducer;
