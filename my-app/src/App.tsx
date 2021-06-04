
import React from 'react';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";

import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import UsersContainer from "./components/Users/UsersContainer";

import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";

import store, {TAppState} from "./redux/redux-store";

import {connect, Provider} from "react-redux";
import {compose} from "redux";

// Styles
import './App.css';

const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedDialogs = withSuspense(DialogsContainer);

type TAppProps = {
    initialized: boolean;

    initializeApp: () => void;
}

class App extends React.Component<TAppProps> {

    componentDidMount() {
        this.props.initializeApp();
    }

    render = () => {
        if (!this.props.initialized) {
            return <Preloader />;
        }

        return (

            <div className='app-wrapper'>
                <HeaderContainer/>
                <NavbarContainer />

                <div className="app-wrapper-content">
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to='/profile' />} />
                        <Route path='/dialogs' render={() => <SuspendedDialogs />} />
                        <Route path='/profile/:userId?' render={() => <SuspendedProfile /> } />
                        <Route path='/users' render={() => <UsersContainer /> } />
                        <Route path='/login' render={() => <Login /> } />
                        <Route path='/news' component={News} />
                        <Route path='/music' component={Music} />
                        <Route path='/settings' component={Settings} />
                    </Switch>
                </div>

            </div>
        );
    };
}

const mapStateToProps = (state: TAppState) => {
  return {
      initialized: state.app.initialized,
  };
};

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps,{initializeApp}))(App);

const MainApp: React.FC = () => {
    return  <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
};

export default MainApp
