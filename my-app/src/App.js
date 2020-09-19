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

const App = props => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <NavbarContainer />
                <div className="app-wrapper-content">
                    {/*<Route path='/profile' component={() => { return <Profile postData={props.postData}/> }}/>
                    <Route path='/dialogs' component={() => { return <Dialogs namesData={props.namesData} messagesData={props.messagesData} />}}/>*/}
                    <Route path='/profile' render={() => { return <Profile /> }}/>
                    <Route path='/dialogs' render={() => { return <DialogsContainer />}}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                </div>

            </div>
        </BrowserRouter>
    );
};

export default App;
