import React from 'react';
import {addNewMessageActionCreator, updateNewMessageCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = props => {

    let state = props.store.getState().dialogPage;

    const addNewMessage = text => {
        props.store.dispatch(addNewMessageActionCreator(text));
    };

    const onMessageChange = e => {
        let body = e.target.value;
        props.store.dispatch(updateNewMessageCreator(body))
    };

    return (<Dialogs addNewMessage={addNewMessage}
                     onMessageChange={onMessageChange}
                     dialogData={state}
    />)
};
export default DialogsContainer;
