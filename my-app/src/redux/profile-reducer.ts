import { APIResponse, ECodes } from "../api/api";
import { TPhotos, TProfile } from "../types/types";
import { CommonDispatch, InferActionsType } from "./redux-store";
import {FormAction, stopSubmit} from "redux-form";
import { profileAPI, TSavePhotos } from "../api/profile-api";

let counter = 0;
const idPrefix = '_' + Math.floor(Math.random() * 9e9).toString(36);

function generateNewUserId() {
    return idPrefix + ++counter;
}

export type TPostData = {
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
export const actions = {
    addNewPost: (newPost: string) => ({
        type: 'ADD_NEW_POST',
        newPost,
    } as const),
    deletePost: (postId: string) => ({
        type: 'DELETE_POST',
        postId,
    } as const),
    setStatus: (status: string) => ({
        type: 'SET_STATUS',
        status,
    } as const),
    setUserProfile: (profile: TProfile) => ({
        type: 'SET_USER_PROFILE',
        profile,
    } as const),
    updatePhotos: (photos: TPhotos) => ({
        type: 'UPDATE_PHOTOS_SUCCESS',
        photos,
    } as const),
}

type TActions = InferActionsType<typeof actions>;
type TInitialState = typeof initialState;
type TDispatch = CommonDispatch<TActions | FormAction>;

const profileReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case 'ADD_NEW_POST': {
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
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile,
            }
        }
        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status,
            }
        }
        case 'DELETE_POST': {
            return {...state, postData: state.postData.filter(post => post.id !== action.postId)}
        }
        case 'UPDATE_PHOTOS_SUCCESS': {
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

export const userProfileById = (userId: number): TDispatch => {
    return async (dispatch) => {
        profileAPI.getProfile(userId)
            .then(function (userProfileData: TProfile) {
                    dispatch(actions.setUserProfile(userProfileData))
                }
            );
    }
};

export const savePhotos = (file: File): TDispatch => {
    return async (dispatch) => {
        let photoData: APIResponse<TSavePhotos> = await profileAPI.savePhoto(file);

        if (photoData.resultCode === ECodes.SUCCESS) {
            dispatch(actions.updatePhotos(photoData.data.photos))
        }
    }
};
export const getStatus = (userId: number): TDispatch => {
    return async (dispatch) => {
        profileAPI.getUserStatus(userId)
            .then(function (statusData: string) {
                dispatch(actions.setStatus(statusData))
            });
    }
};
export const updateStatus = (status: string): TDispatch => {
    return async (dispatch) => {
        let updateProfileData = await profileAPI.updateUserStatus(status);

        if (updateProfileData.resultCode === ECodes.SUCCESS) {
            dispatch(actions.setStatus(status))
        }
    }
};
export const updateProfile = (profile: TProfile): TDispatch => {
    return async (dispatch, getState) => {
        const saveProfileData = await profileAPI.saveProfile(profile);
        const userId = getState().auth.id;

        if (saveProfileData.resultCode === ECodes.SUCCESS) {
            if(userId) {
                await dispatch(userProfileById(userId));
            }
        }
        else {
            // todo: Не работает всплывашка об ошибке
            // @ts-ignore
            dispatch(stopSubmit('profileData',{_error: saveProfileData.messages[0] }));
            return Promise.reject(saveProfileData.messages[0]);
        }
    }
};

export default profileReducer;
