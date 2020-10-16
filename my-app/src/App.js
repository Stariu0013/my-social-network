import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
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

class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render = () => {
        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <NavbarContainer />
                    <div className="app-wrapper-content">
                        {/*<Route path='/profile' component={() => { return <Profile postData={props.postData}/> }}/>
                    <Route path='/dialogs' component={() => { return <Dialogs namesData={props.namesData} messagesData={props.messagesData} />}}/>*/}
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

export default App;
