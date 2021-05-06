import {auth} from "./auth-reducer";
import {InferActionsType} from "./redux-store";

let initialState: {
    initialized: boolean;
} = {
    initialized: false
};

type TInitialState = typeof initialState;
type ActionTypes = InferActionsType<typeof actions>;

const appReducer = (state = initialState, action: ActionTypes): TInitialState => {
    switch(action.type) {
        case 'INITIALIZED_SUCCESSFULLY': {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
};

const actions = {
    initialized_successfully: () => ({
        type: 'INITIALIZED_SUCCESSFULLY'
    } as const),
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(auth());
    promise.then(
        dispatch(actions.initialized_successfully())
    )
};
export default appReducer;
