import React from 'react';
import { actions } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/redirectHOC";
import { compose } from "redux";
import { TAppState } from "../../redux/redux-store";

function mapStateToProps(state: TAppState) {
    return {
        dialogData: state.dialogPage,
        isAuth: state.auth.isAuth,
    };
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, { addNewMessage: actions.addNewMessage }),
    withAuthRedirect,
)(Dialogs);
