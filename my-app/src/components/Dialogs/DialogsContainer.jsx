import React from 'react';
import {addNewMessageActionCreator, updateNewMessageCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

let mapStateToProps = state => {
    return {
        dialogData: state.dialogPage
    }
};

let mapDispatchToProps = dispatch => {
    return {
        addNewMessage: text => {
            dispatch(addNewMessageActionCreator(text));
        },
        onMessageChange: e => {
            let body = e.target.value;
            dispatch(updateNewMessageCreator(body))
        }
    }
};

let DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
