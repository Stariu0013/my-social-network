import {CommonDispatch, InferActionsType} from "./redux-store";
import {Dispatch} from "redux";
import {chatAPI, MessageCB, MessageT} from "../api/chat-api";

let initialState: {
    messages: MessageT[];
} = {
    messages: [],
};

type TInitialState = typeof initialState;
type ActionTypes = InferActionsType<typeof actions>;
type TDispatch = CommonDispatch<InferActionsType<typeof actions>>;

const chatReducer = (state = initialState, action: ActionTypes): TInitialState => {
    switch (action.type) {
        case 'MESSAGES_RECEIVED': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload],
            };
        }
        default:
            return state;
    }
};

let _newMessageHandler: MessageCB | null = null;

const actions = {
    messagesReceived: (messages: MessageT[]) => ({
        type: 'MESSAGES_RECEIVED',
        payload: messages,
    } as const),
};

const messageHandler = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages));
        };
    }

    return _newMessageHandler;
};

export const startMessageListening = (): TDispatch => async (dispatch) => {
    chatAPI.startListening();
    chatAPI.subscribe(messageHandler(dispatch));
};

export const stopMessageListening = (): TDispatch => async (dispatch) => {
    chatAPI.stopListening();
    chatAPI.unsubscribe(messageHandler(dispatch));
};
export const sendMessage = (message: string) => {
    chatAPI.sendMessage(message);
};

export default chatReducer;
