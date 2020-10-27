import React from 'react';
import {addNewMessageActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/redirectHOC";
import {compose} from "redux";

let mapStateToProps = state => {
    return {
        dialogData: state.dialogPage,
    }
};

let mapDispatchToProps = dispatch => {
    return {
        addNewMessage: text => {
            dispatch(addNewMessageActionCreator(text));
        }
    }
};

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs);
