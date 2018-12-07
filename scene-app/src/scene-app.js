import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {createReducer, createAction} from 'redux-act';
import * as serviceWorker from './serviceWorker';

const showWelcomeMessage = createAction('SHOW_WELCOME_MESSAGE');
const playVideo = createAction('PLAY_VIDEO');
const playAudio = createAction('PLAY_AUDIO');
const chickenCommand = createAction('CHICKEN_COMMAND');
const showIcon = createAction('SHOW_EMOTION');

const store = createStore(
    combineReducers({
        videoPlayer: createReducer({[playVideo]: (state, payload) => ({...payload, id: state.id + 1})}, {id: 0}),
        welcomeMessages: createReducer({
            [showWelcomeMessage]: (state, payload) => ({
                ...payload,
                id: state.id + 1
            })
        }, {id: 0}),
        audioPlayer: createReducer({[playAudio]: (state, payload) => ({...payload, id: state.id + 1})}, {id: 0}),
        icons: createReducer({[showIcon]: (state, payload) => ({...payload, id: state.id + 1})}, {id: 0}),
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
const socket = io('http://127.0.0.1:62619');

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
    } else if (message.isIcons) {
        store.dispatch(showIcon(message))
    } else if (message.isWelcomeMessage) {
        store.dispatch(showWelcomeMessage(message))
    }
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
