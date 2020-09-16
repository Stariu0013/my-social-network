import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";

const App = props => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar state={props.state}/>
                <div className="app-wrapper-content">
                    {/*<Route path='/profile' component={() => { return <Profile postData={props.postData}/> }}/>
                    <Route path='/dialogs' component={() => { return <Dialogs namesData={props.namesData} messagesData={props.messagesData} />}}/>*/}
                    <Route path='/profile' render={() => { return <Profile data={props.state.profilePage}
                                                                           addPost={props.addPost}
                                                                           updateNewPostText={props.updateNewPostText}
                    /> }}/>
                    <Route path='/dialogs' render={() => { return <Dialogs dialog={props.state.dialogPage} addNewMessage={props.addNewMessage}/>}}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                </div>

            </div>
        </BrowserRouter>
    );
};


export default App;
