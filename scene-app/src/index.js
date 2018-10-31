import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import createReducer from 'redux-action-reducer';
import * as serviceWorker from './serviceWorker';

const store = createStore(
    combineReducers({
        videoPlayer: createReducer(['PLAY_VIDEO', 'STOP_VIDEO'])
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('message', function (message) {
    console.log('message: ', message);
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
