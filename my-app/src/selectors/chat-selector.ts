import {TAppState} from "../redux/redux-store";

export const getMessagesSelector = (state: TAppState) => {
    return state.chat.messages;
};

