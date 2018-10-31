import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {createReducer, createAction} from 'redux-act';
import * as serviceWorker from './serviceWorker';

const playVideo = createAction('PLAY_VIDEO');

const store = createStore(
    combineReducers({
        videoPlayer: createReducer({
            [playVideo]: (state, payload) => ({...payload, id: state.id+1})
        }, {id: 0})
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('message', function (message) {
    if (message.media) {
        if (/(.*)+(.mp4|.webm|.mov|.mpeg)$/.test(message.media)) {
            store.dispatch({type: 'PLAY_VIDEO', payload: {video: message.media}});
        }
    }
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
