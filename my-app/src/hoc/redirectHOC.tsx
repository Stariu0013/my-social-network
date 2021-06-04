import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {TAppState} from "../redux/redux-store";

const mapStateToPropsForRedirect = (state: TAppState) => ({
    isAuth: state.auth.isAuth,
} as TWrappedComponentProps);

type TWrappedComponentProps = {
    isAuth: boolean;
}

export function withAuthRedirect<T> (WrappedComponent: React.ComponentType<T>) {

    const RedirectComponent: React.FC<TWrappedComponentProps & {}>= (props) => {
        const { isAuth } = props;

        if (!isAuth) {
            console.log('unauthorized withAuthRedirect', props);
            return <Redirect to='/login'/>;
        }

        return <WrappedComponent {...props as any as T}/>;
    };

    let ConnectedWithAuthRedirect = connect<TWrappedComponentProps,
        {}, T, TAppState>(mapStateToPropsForRedirect, {})
    (RedirectComponent);

    return ConnectedWithAuthRedirect;
}

