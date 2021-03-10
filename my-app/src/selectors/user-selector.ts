import {createSelector} from "reselect";
import {TAppState} from "../redux/redux-store";
import {TUser} from "../types/types";

const getUsersSelector = (state: TAppState) => {
    return state.usersPage.users;
};

export const getUsers = createSelector(getUsersSelector, (users: TUser[]) => {
    return users.filter(u => true);
});

export const getPageSize = (state: TAppState) => {
    return state.usersPage.pageSize;
};

export const getUsersTotalCount = (state: TAppState) => {
    return state.usersPage.usersTotalCount;
};

export const getCurrentPage = (state: TAppState) => {
    return state.usersPage.currentPage;
};

export const getIsFetching = (state: TAppState) => {
    return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state: TAppState) => {
    return state.usersPage.followingInProgress;
};
