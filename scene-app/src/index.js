import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');
socket.on('connect', function () {
    console.log('connected')
});
socket.on('event', function (data) {
    console.log('got data ' + data)
});
socket.on('disconnect', function () {
    console.log('disconnected')
});
ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
