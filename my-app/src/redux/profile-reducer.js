import {profileAPI, userAPI} from "../api/api";

const ADD_NEW_POST = "ADD-NEW-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

let initialState = {
    postData: [
        {id: 1, message: 'Hello, there', likesCount: 15},
        {id: 1, message: 'What is up?', likesCount: 20}
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_POST: {
            let newPost = {
                id: 5,
                message: action.newPost,
                likesCount: 0
            };
            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: '',
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
        default:
            return state;
    }
};

export const addNewPostActionCreator = newPost => {
    return {
        type: ADD_NEW_POST,
        newPost
    }
};

export const setStatus = status => {
    return {
        type: SET_STATUS,
        status
    }
};
export const setUserProfile = profile => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
};

export const userProfileById = (userId) => {
    return dispatch => {
        userAPI.getProfile(userId)
            .then(response =>
                dispatch(setUserProfile(response.data)
                ));
    }
};
export const getStatus = (userId) => {
    return dispatch => {
        profileAPI.getUserStatus(userId)
            .then(response =>
                dispatch(setStatus(response.data)
                ));
    }
};
export const updateStatus = (status) => {
    return dispatch => {
        profileAPI.updateUserStatus(status)
            .then(response => {
                    if(response.data.resultCode === 0) {
                        dispatch(setStatus(status))
                    }
                }
            );
    }
};

export default profileReducer;
