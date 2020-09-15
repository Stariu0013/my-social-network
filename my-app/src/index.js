import React from 'react';
import state, {subscribe} from './redux/state'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addNewPost, updateNewPostText} from "./redux/state";


export let rerenderEntireTree = state => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} addPost={addNewPost} updateNewPostText={updateNewPostText}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
};
rerenderEntireTree(state);

subscribe(rerenderEntireTree);
