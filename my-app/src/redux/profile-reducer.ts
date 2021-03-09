import {ECodes, profileAPI, userAPI} from "../api/api";
import {TProfile} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {TAppState} from "./redux-store";

const ADD_NEW_POST = "ADD-NEW-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";

let counter = 0;
const idPrefix = '_' + Math.floor(Math.random() * 9e9).toString(36);

function generateNewUserId(){
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
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {...state, postData: state.postData.filter(post => post.id !== action.postId)}
        }
        default:
            return state;
    }
};

type TActions = AddNewPostType | DeletePostType | SetStatusType | SetUserProfile;

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

type TDispatch = ThunkAction<Promise<void>, TAppState, unknown, TActions>;

export const userProfileById = (userId: number): TDispatch => {
    return async (dispatch) => {
        userAPI.getProfile(userId)
            .then((response: any) =>
                dispatch(setUserProfile(response.data)
                ));
    }
};
export const getStatus = (userId: number): TDispatch => {
    return async (dispatch) => {
        profileAPI.getUserStatus(userId)
            .then((response: any) =>
                dispatch(setStatus(response.data)
                ));
    }
};
export const updateStatus = (status: string): TDispatch => {
    return async (dispatch) => {
        profileAPI.updateUserStatus(status)
            .then((response: any) => {
                    if(response.resultCode === ECodes.SUCCESS) {
                        dispatch(setStatus(status))
                    }
                }
            );
    }
};

export default profileReducer;
