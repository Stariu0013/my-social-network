import React from 'react';
import store from './redux/state';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

export let rerenderEntireTree = state => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state}
                 dispatch={store.dispatch.bind(store)}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
};
rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree);
