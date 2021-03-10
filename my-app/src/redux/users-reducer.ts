import {ECodes, userAPI} from "../api/api";
import {updateObjectInArray} from "../utils/helpers/object-helpers";
import {TUser} from "../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {TAppState} from "./redux-store";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS";

let initialState: {
    users: TUser[],
    pageSize: number,
    usersTotalCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[],
} = {
    users: [],
    pageSize: 5,
    usersTotalCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

type TInitialState = typeof initialState;

const usersReducer = (state = initialState, action: TActions): TInitialState => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, "id", action.userId, {followed: true})
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, "id", action.userId, {followed: false})
            }
        }
        case SET_USERS: {
            return {...state, users: [...action.users]}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, usersTotalCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
};

type TActions = TFollowSuccess | TUnfollowSuccess | TSetUsers
    | TSetCurrentPage | TSetTotalUsersCount| TToggleIsFetching
    | TToggleFollowingProgress;

type TFollowSuccess = {
    type: typeof FOLLOW,
    userId: number
}
export const followSuccess = (userId: number): TFollowSuccess => {
    return {
        type: FOLLOW,
        userId
    }
};
type TUnfollowSuccess = {
    type: typeof UNFOLLOW,
    userId: number,
}
export const unfollowSuccess = (userId: number): TUnfollowSuccess => {
    return {
        type: UNFOLLOW,
        userId
    }
};
type TSetUsers = {
    type: typeof SET_USERS,
    users: TUser[],
}
export const setUsers = (users: TUser[]): TSetUsers => {
    return {
        type: SET_USERS,
        users
    }
};
type TSetCurrentPage = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number,
}
export const setCurrentPage = (currentPage: number): TSetCurrentPage => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
};
type TSetTotalUsersCount = {
    type: typeof SET_TOTAL_USERS_COUNT,
    count: number,
}
export const setTotalUsersCount = (count: number): TSetTotalUsersCount => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        count
    }
};
type TToggleIsFetching = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean,
}
export const toggleIsFetching = (isFetching: boolean): TToggleIsFetching => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
};
type TToggleFollowingProgress = {
    type: typeof TOGGLE_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number,
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): TToggleFollowingProgress => {
    return {
        type: TOGGLE_FOLLOWING_PROGRESS,
        isFetching,
        userId
    }
};

type TDispatch = ThunkAction<Promise<void>, TAppState, unknown, TActions>;

export const requestUsers = (currentPage: number, pageSize: number): TDispatch => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage));

        let UsersData = await userAPI.getUsers(currentPage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(UsersData.items));
        dispatch(setTotalUsersCount(UsersData.totalCount > 100 ? UsersData.totalCount = 100 : UsersData.totalCount));
    }
};

const _followUnfollowFlow = async (dispatch: Dispatch<TActions>, userId: number, apiMethod: any, actionCreator: (userId: number) => TUnfollowSuccess | TFollowSuccess) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);

    if (response.resultCode === ECodes.SUCCESS) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const unfollow = (userId: number): TDispatch => {
    return async (dispatch) => {
        let apiMethod = userAPI.unfollow.bind(userAPI);
        await _followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess);
    }
};

export const follow = (userId: any): TDispatch => {
    return async (dispatch) => {
        let apiMethod = userAPI.follow.bind(userAPI);
        await _followUnfollowFlow(dispatch, userId, apiMethod, followSuccess);
    }
};

export default usersReducer;
