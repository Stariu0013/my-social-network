import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {auth, logout} from "../../redux/auth-reducer";
import {TAppState} from "../../redux/redux-store";

type THeaderContainer = {
    isAuth: boolean;
    login: string | null;

    auth: () => void;
    logout: () => void;
}

class HeaderContainer extends React.Component<THeaderContainer> {

    render = () => {
        return <Header { ...this.props }/>
    }
}

let mapStateToProps = (state: TAppState) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps,{auth, logout})(HeaderContainer);
