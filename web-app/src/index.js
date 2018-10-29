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
import createSagaMiddleware from 'redux-saga';
import watchAuthentication from './authentication/authentication-saga';
import watchSaveMedia from './media/save-media-saga';
import watchOpenMediaFolder from './media/open-media-folder-saga';
import watchFetchMedia from './media/fetch-media-saga';
import watchImportMedia from './media/import-media-saga';
import watchStartChat from './chat-controls/start-chat-saga';
import {reducer as formReducer} from 'redux-form';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        authentication: authenticationReducer,
        media: mediaReducer,
        form: formReducer,
        environment: environmentReducer,
        chatControls: chatControlsReducer
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAuthentication);
sagaMiddleware.run(watchSaveMedia);
sagaMiddleware.run(watchFetchMedia);
sagaMiddleware.run(watchStartChat);
sagaMiddleware.run(watchImportMedia);
sagaMiddleware.run(watchOpenMediaFolder);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
