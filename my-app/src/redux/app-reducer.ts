import {auth} from "./auth-reducer";

const INITIALIZED_SUCCESSFULLY = "INITIALIZED_SUCCESSFULLY";

let initialState: {
    initialized: boolean;
} = {
    initialized: false
};

type TInitialState = typeof initialState;

const appReducer = (state = initialState, action: ActionTypes): TInitialState => {
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

type ActionTypes = InitializedSuccessType;

type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESSFULLY;
}

export const initialized_successfully = (): InitializedSuccessType => {
    return {
        type: INITIALIZED_SUCCESSFULLY
    }
};

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(auth());
    promise.then(
        dispatch(initialized_successfully())
    )
};
export default appReducer;
