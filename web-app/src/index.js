import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import authenticationReducer from './authentication/authentication-reducer';
import mediaReducer from './media/media-reducer';
import environmentReducer from './environment/environment-reducer';
import chatControlsReducer from './chat-controls/chat-controls-reducer';
import streamElementsReducer from './authentication/stream-elements/stream-elements-reducer';
import streamLabsReducer from './authentication/stream-labs/stream-labs-reducer';
import youtubeChatControlsReducer from './chat-controls/youtube/youtube-chat-controls-reducer';
import chickenControlsReducer from './chicken-control/chicken-reducer'
import iconsReducer from './icons/icons-reducer';
import newsReducer from './news/news-reducer';
import welcomeReducer from './welcome/welcome-reducer';
import loyaltyReducer from './loyalty/loyalty-reducer';
import navigatorReducer from './navigator/navigator-reducer';

import saveSettingsFor from './settings-panel/save-settings-saga';
import fetchSettingsFor from './settings-panel/fetch-settings-saga';

import reducerFor from './settings-panel/settings-reducer';

import createSagaMiddleware from 'redux-saga';

import watchAuthentication from './authentication/authentication-saga';
import watchSaveMedia from './media/sagas/save-media-saga';
import watchOpenMediaFolder from './media/sagas/open-media-folder-saga';
import watchFetchMedia from './media/sagas/fetch-media-saga';
import watchImportMedia from './media/sagas/import-media-saga';
import watchStartChat from './chat-controls/start-chat-saga';
import watchStopChat from './chat-controls/stop-chat-saga';
import watchPlayMedia from './remote-control/play-media-saga';
import watchFetchStreamElementsToken from './authentication/stream-elements/fetch-stream-elements-token-saga';
import watchSaveStreamElementsToken from './authentication/stream-elements/save-stream-elements-token-saga';
import watchDisconnectStreamLabs from './authentication/stream-labs/disconnect-streamlabs-saga';
import watchFetchStreamLabsData from './authentication/stream-labs/fetch-stream-labs-data-saga';
import watchFetchYoutubeBroadcasts from './chat-controls/youtube/fetch-youtube-broadcasts-saga';
import watchFetchChicken from './chicken-control/sagas/fetch-chicken-saga';
import watchSaveChicken from './chicken-control/sagas/save-chicken-saga';
import watchChickenCommand from './chicken-control/sagas/chicken-command-saga';
import watchFetchNews from './news/sagas/fetch-news-saga';
import watchSaveNews from './news/sagas/save-news-saga';
import watchFetchIcons from './icons/sagas/fetch-icons-saga';
import watchSaveIcons from './icons/sagas/save-icons-saga';
import watchFetchWelcome from './welcome/sagas/fetch-welcome-saga';
import watchSaveWelcome from './welcome/sagas/save-welcome-saga';
import watchFetchLoyalty from './loyalty/sagas/fetch-loyalty-saga';
import watchSaveLoyalty from './loyalty/sagas/save-loyalty-saga';

const packageFor = (key) => ({
    watchFetch: fetchSettingsFor(key),
    watchSave: saveSettingsFor(key),
    reducer: reducerFor(key)
});

const testSetting = packageFor('test');

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        authentication: authenticationReducer,
        media: mediaReducer,
        environment: environmentReducer,
        chatControls: chatControlsReducer,
        youtubeChatControls: youtubeChatControlsReducer,
        navigator: navigatorReducer,
        streamElements: streamElementsReducer,
        streamLabs: streamLabsReducer,
        chicken: chickenControlsReducer,
        icons: iconsReducer,
        news: newsReducer,
        welcome: welcomeReducer,
        loyalty: loyaltyReducer,
        test: testSetting.reducer
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAuthentication);
sagaMiddleware.run(watchSaveMedia);
sagaMiddleware.run(watchFetchMedia);
sagaMiddleware.run(watchStartChat);
sagaMiddleware.run(watchStopChat);
sagaMiddleware.run(watchImportMedia);
sagaMiddleware.run(watchOpenMediaFolder);
sagaMiddleware.run(watchPlayMedia);
sagaMiddleware.run(watchFetchStreamElementsToken);
sagaMiddleware.run(watchSaveStreamElementsToken);
sagaMiddleware.run(watchFetchYoutubeBroadcasts);
sagaMiddleware.run(watchSaveChicken);
sagaMiddleware.run(watchFetchChicken);
sagaMiddleware.run(watchChickenCommand);
sagaMiddleware.run(watchFetchStreamLabsData);
sagaMiddleware.run(watchDisconnectStreamLabs);
sagaMiddleware.run(watchFetchIcons);
sagaMiddleware.run(watchSaveIcons);
sagaMiddleware.run(watchFetchNews);
sagaMiddleware.run(watchSaveNews);
sagaMiddleware.run(watchFetchWelcome);
sagaMiddleware.run(watchSaveWelcome);
sagaMiddleware.run(watchFetchLoyalty);
sagaMiddleware.run(watchSaveLoyalty);
sagaMiddleware.run(testSetting.watchSave);
sagaMiddleware.run(testSetting.watchFetch);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
