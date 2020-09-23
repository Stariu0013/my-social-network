const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

let initialState = {
    users: [
        {id: 1, imgURL: "https://upload.wikimedia.org/wikipedia/commons/8/88/Dmitry_Nagiev_2017_4.jpg",
            fullName: 'Vlad Starynets', followed: true, status: "I'm da boss", location: { country: "Ukraine", city: 'Kiev'}},
        {id: 2, imgURL:"https://upload.wikimedia.org/wikipedia/commons/8/88/Dmitry_Nagiev_2017_4.jpg",
            fullName: 'Yarik Starynets', followed: true, status: "I'm da boss too", location: { country: "Ukraine", city: 'Kiev'}},
        {id: 3, imgURL: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Dmitry_Nagiev_2017_4.jpg',
            fullName: 'Nazar Smorzhevsky', followed: false, status: "I'm da boss too", location: { country: "Ukraine", city: 'Kiev'}},
    ]
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return { ...u, followed: true}
                    }
                    return u;
                })
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return { ...u, followed: false}
                    }
                    return u;
                })
            }
        }
        case SET_USERS: {
            return {...state, users: [...state.users, ...action.users]}
        }
        default:
            return state
    }
};

export const followAC = userId => {
    return {
        type: FOLLOW,
        userId
    }
};

export const unfollowAC = userId => {
    return {
        type: UNFOLLOW,
        userId
    }
};

export const setUsersAC = users => {
    return {
        type: SET_USERS,
        users
    }
};

export default usersReducer;
