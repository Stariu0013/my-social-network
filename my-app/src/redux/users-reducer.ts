import {ECodes, userAPI} from "../api/api";
import {updateObjectInArray} from "../utils/helpers/object-helpers";
import {TUser} from "../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {InferActionsType, TAppState} from "./redux-store";

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
        case 'FOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, "id", action.userId, {followed: true})
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, "id", action.userId, {followed: false})
            }
        }
        case 'SET_USERS': {
            return {...state, users: [...action.users]}
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, usersTotalCount: action.count}
        }
        case 'TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'TOGGLE_FOLLOWING_PROGRESS': {
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

type TActions = InferActionsType<typeof actions>;

export const actions = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId,} as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId,} as const),
    setUsers: (users: TUser[]) => ({type: 'SET_USERS', users,} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage,} as const),
    setTotalUsersCount: (count: number) => ({type: 'SET_TOTAL_USERS_COUNT', count,} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching,} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'TOGGLE_FOLLOWING_PROGRESS', isFetching, userId,} as const),
};

type TDispatch = ThunkAction<Promise<void>, TAppState, unknown, TActions>;

export const requestUsers = (currentPage: number, pageSize: number): TDispatch => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));

        let UsersData = await userAPI.getUsers(currentPage, pageSize);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(UsersData.items));
        dispatch(actions.setTotalUsersCount(UsersData.totalCount > 100 ? UsersData.totalCount = 100 : UsersData.totalCount));
    }
};

const _followUnfollowFlow = async (dispatch: Dispatch<TActions>, userId: number, apiMethod: any, actionCreator: (userId: number) => TActions) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);

    if (response.resultCode === ECodes.SUCCESS) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export const unfollow = (userId: number): TDispatch => {
    return async (dispatch) => {
        let apiMethod = userAPI.unfollow.bind(userAPI);
        await _followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollowSuccess);
    }
};

export const follow = (userId: any): TDispatch => {
    return async (dispatch) => {
        let apiMethod = userAPI.follow.bind(userAPI);
        await _followUnfollowFlow(dispatch, userId, apiMethod, actions.followSuccess);
    }
};

export default usersReducer;
