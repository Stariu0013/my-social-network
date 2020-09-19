const ADD_NEW_MESSAGE = "ADD-NEW-MESSAGE";
const UPDATE_MESSAGE_BODY = "UPDATE-MESSAGE-BODY";

const dialogReducer = (state, action) => {

    switch(action.type) {
        case ADD_NEW_MESSAGE:
            let message = {
                id: 4,
                message: action.messageText
            };
            state.messagesData.push(message);
            return state;
        case UPDATE_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state;
        default:
            return state;
    }
};

export const addNewMessageActionCreator = text => {
    return {
        type: 'ADD-NEW-MESSAGE',
        messageText: text
    }
};

export const updateNewMessageCreator = text => {
    return {
        type: "UPDATE-MESSAGE-BODY",
        postText: text
    }
};

export default dialogReducer;
