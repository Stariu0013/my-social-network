import {auth} from "./auth-reducer";

const INITIALIZED_SUCCESSFULLY = "INITIALIZED_SUCCESSFULLY";

type InitialStateTypes = {
    initialized: boolean;
}

let initialState: InitialStateTypes = {
    initialized: false
};

const appReducer = (state = initialState, action: any): InitialStateTypes => {
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

type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESSFULLY;
}

export const initialized_successfully = (): InitializedSuccessType => {
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
