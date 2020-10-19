import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.initializeApp()
    }

    render = () => {
        if(!this.props.initialized) {
            return <Preloader />
        }
        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <NavbarContainer />
                    <div className="app-wrapper-content">
                        <Route path='/profile/:userId?' render={() => { return <ProfileContainer /> }}/>
                        <Route path='/dialogs' render={() => { return <DialogsContainer />}}/>
                        <Route path='/users' render={() => { return <UsersContainer />}}/>
                        <Route path='/login' render={() => { return <Login />}}/>
                        <Route path='/news' component={News}/>
                        <Route path='/music' component={Music}/>
                        <Route path='/settings' component={Settings}/>
                    </div>

                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
  return {
      initialized: state.app.initialized
  }
};

export default compose(
    connect(mapStateToProps,{initializeApp}))(App);
