import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import authenticationReducer from './authentication/authentication-reducer';
import mediaExtrasReducer from './media/media-reducer';
import environmentReducer from './environment/environment-reducer';
import chatControlsReducer from './chat-controls/chat-controls-reducer';
import streamElementsReducer from './authentication/stream-elements/stream-elements-reducer';
import streamLabsReducer from './authentication/stream-labs/stream-labs-reducer';
import youtubeChatControlsReducer from './chat-controls/youtube/youtube-chat-controls-reducer';
import navigatorReducer from './navigator/navigator-reducer';

import saveSettingsFor from './settings-panel/save-settings-saga';
import fetchSettingsFor from './settings-panel/fetch-settings-saga';

import reducerFor from './settings-panel/settings-reducer';

import createSagaMiddleware from 'redux-saga';

import watchAuthentication from './authentication/authentication-saga';
import watchOpenMediaFolder from './media/sagas/open-media-folder-saga';
import watchImportMedia from './media/sagas/import-media-saga';
import watchStartChat from './chat-controls/start-chat-saga';
import watchStopChat from './chat-controls/stop-chat-saga';
import watchPlayMedia from './remote-control/play-media-saga';
import watchFetchStreamElementsToken from './authentication/stream-elements/fetch-stream-elements-token-saga';
import watchSaveStreamElementsToken from './authentication/stream-elements/save-stream-elements-token-saga';
import watchDisconnectStreamLabs from './authentication/stream-labs/disconnect-streamlabs-saga';
import watchFetchStreamLabsData from './authentication/stream-labs/fetch-stream-labs-data-saga';
import watchFetchYoutubeBroadcasts from './chat-controls/youtube/fetch-youtube-broadcasts-saga';

const packageFor = (key) => ({
    key,
    watchFetch: fetchSettingsFor(key),
    watchSave: saveSettingsFor(key),
    reducer: reducerFor(key)
});

const quizSettings = packageFor('quiz');
const loyaltySettings = packageFor('loyalty');
const newsSettings = packageFor('news');
const welcomeSettings = packageFor('welcome');
const iconsSettings = packageFor('icons');
const chickenSettings = packageFor('chicken');
const mediaSettings = packageFor('media');

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        authentication: authenticationReducer,
        mediaExtras: mediaExtrasReducer,
        environment: environmentReducer,
        chatControls: chatControlsReducer,
        youtubeChatControls: youtubeChatControlsReducer,
        navigator: navigatorReducer,
        streamElements: streamElementsReducer,
        streamLabs: streamLabsReducer,
        [chickenSettings.key]: chickenSettings.reducer,
        [loyaltySettings.key]: loyaltySettings.reducer,
        [quizSettings.key]: quizSettings.reducer,
        [newsSettings.key]: newsSettings.reducer,
        [iconsSettings.key]: iconsSettings.reducer,
        [welcomeSettings.key]: welcomeSettings.reducer,
        [mediaSettings.key]: mediaSettings.reducer
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAuthentication);
sagaMiddleware.run(watchStartChat);
sagaMiddleware.run(watchStopChat);
sagaMiddleware.run(watchImportMedia);
sagaMiddleware.run(watchOpenMediaFolder);
sagaMiddleware.run(watchPlayMedia);
sagaMiddleware.run(watchFetchStreamElementsToken);
sagaMiddleware.run(watchSaveStreamElementsToken);
sagaMiddleware.run(watchFetchYoutubeBroadcasts);
sagaMiddleware.run(watchFetchStreamLabsData);
sagaMiddleware.run(watchDisconnectStreamLabs);
sagaMiddleware.run(quizSettings.watchSave);
sagaMiddleware.run(quizSettings.watchFetch);
sagaMiddleware.run(loyaltySettings.watchSave);
sagaMiddleware.run(loyaltySettings.watchFetch);
sagaMiddleware.run(newsSettings.watchSave);
sagaMiddleware.run(newsSettings.watchFetch);
sagaMiddleware.run(welcomeSettings.watchSave);
sagaMiddleware.run(welcomeSettings.watchFetch);
sagaMiddleware.run(iconsSettings.watchSave);
sagaMiddleware.run(iconsSettings.watchFetch);
sagaMiddleware.run(chickenSettings.watchSave);
sagaMiddleware.run(chickenSettings.watchFetch);
sagaMiddleware.run(mediaSettings.watchSave);
sagaMiddleware.run(mediaSettings.watchFetch);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
