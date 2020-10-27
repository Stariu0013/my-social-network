import {auth} from "./auth-reducer";

const INITIALIZED_SUCCESSFULLY = "INITIALIZED_SUCCESSFULLY";

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case INITIALIZED_SUCCESSFULLY: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
};

export const initialized_successfully = () => {
    return {
        type: INITIALIZED_SUCCESSFULLY
    }
};

export const initializeApp = () => dispatch => {
    let promise = dispatch(auth());
    promise.then(
        dispatch(initialized_successfully())
    )
};
export default appReducer;
