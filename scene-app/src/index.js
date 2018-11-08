import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {createReducer, createAction} from 'redux-act';
import * as serviceWorker from './serviceWorker';

const playVideo = createAction('PLAY_VIDEO');
const playAudio = createAction('PLAY_AUDIO');
const moveChicken = createAction('MOVE_CHICKEN');

const store = createStore(
    combineReducers({
        videoPlayer: createReducer({[playVideo]: (state, payload) => ({...payload, id: state.id + 1})}, {id: 0}),
        audioPlayer: createReducer({[playAudio]: (state, payload) => ({...payload, id: state.id + 1})}, {id: 0}),
        chicken: createReducer({[moveChicken]: (state, payload) => ({...payload, id: state.id + 1})}, {
            moving: false,
            x: 0,
            y: 0,
            facing: 'right'
        })
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const io = require('socket.io-client');
const socket = io('http://localhost:62619');

socket.on('message', function (message) {
    console.log('message received >', message);
    if (message.media) {
        if (/\.(mp4|webm)$/i.test(message.media)) {
            store.dispatch(playVideo({video: message.media}));
        } else if (/\.(mp3|aac|ogg|flac|wav)$/i.test(message.media)) {
            store.dispatch(playAudio({audio: message.media}));
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
