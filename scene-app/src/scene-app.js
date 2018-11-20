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
const chickenCommand = createAction('CHICKEN_COMMAND');
const showEmotion = createAction('SHOW_EMOTION');

const store = createStore(
    combineReducers({
        videoPlayer: createReducer({[playVideo]: (state, payload) => ({...payload, id: state.id + 1})}, {id: 0}),
        audioPlayer: createReducer({[playAudio]: (state, payload) => ({...payload, id: state.id + 1})}, {id: 0}),
        emotions: createReducer({[showEmotion]: (state, payload) => ({...payload, id: state.id + 1})}, {id: 0}),
        chicken: createReducer({
            [chickenCommand]: (state, payload) => {
                const sayId = payload.say ? state.sayId + 1 : state.sayId;
                const moveId = payload.move ? state.moveId + 1 : state.moveId;
                return {
                    ...payload,
                    moveId,
                    sayId
                }
            }
        }, {moveId: 0, sayId: 0})
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const io = require('socket.io-client');
const socket = io('http://localhost:62619');

socket.on('message', function (message) {
    console.log('message received >', message);
    if (message.isMedia) {
        if (/\.(mp4|webm)$/i.test(message.url)) {
            store.dispatch(playVideo({...message}));
        } else if (/\.(mp3|aac|ogg|flac|wav)$/i.test(message.url)) {
            store.dispatch(playAudio({...message}));
        }
    } else if (message.chicken) {
        store.dispatch(chickenCommand(message.chicken));
    } else if (message.isEmotions) {
        store.dispatch(showEmotion(message))
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