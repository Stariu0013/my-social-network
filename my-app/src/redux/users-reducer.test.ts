import usersReducer, {actions, follow, unfollow} from "./users-reducer";
import {TUser} from "../types/types";
import {userAPI} from "../api/users-api";
import {APIResponse, ECodes} from "../api/api";

jest.mock('../api/users-api');
const userMockAPI = userAPI as jest.Mocked<typeof userAPI>;

const result: APIResponse = {
    resultCode: ECodes.SUCCESS,
    data: {},
    messages: [],
}

// @ts-ignore
userMockAPI.follow.mockReturnValue(Promise.resolve(result));
userMockAPI.unfollow.mockReturnValue(Promise.resolve(result));

let state: {
    users: TUser[],
    pageSize: number,
    usersTotalCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[],
};

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    state = {
        users: [
            {
                followed: true,
                id: 0,
                name: 'Vlad 0',
                photos: {
                    small: null,
                    large: null,
                },
                status: 'status 0'
            },
            {
                followed: false,
                id: 1,
                name: 'Vlad 1',
                photos: {
                    small: null,
                    large: null,
                },
                status: 'status 1'
            },
            {
                followed: true,
                id: 2,
                name: 'Vlad 2',
                photos: {
                    small: null,
                    large: null,
                },
                status: 'status 2'
            },
            {
                followed: true,
                id: 3,
                name: 'Vlad 3',
                photos: {
                    small: null,
                    large: null,
                },
                status: 'status 3'
            },
        ],
        pageSize: 5,
        usersTotalCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    };

    dispatchMock.mockClear();
    getStateMock.mockClear();
    userMockAPI.follow.mockClear();
    userMockAPI.unfollow.mockClear();
})

test('follow thunk success', async () => {
    const thunk = follow(1);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});
test('unfollow thunk success', async () => {
    const thunk = unfollow(1);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});

test('follow success', () => {
    const newState = usersReducer(state, actions.followSuccess(1));

    expect(newState.users[1].followed).toBeTruthy();
});

test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(0));

    expect(newState.users[0].followed).toBeFalsy();
});

export {};