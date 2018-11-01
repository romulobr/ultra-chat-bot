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
import watchSaveMedia from './media/sagas/save-media-saga';
import watchOpenMediaFolder from './media/sagas/open-media-folder-saga';
import watchFetchMedia from './media/sagas/fetch-media-saga';
import watchImportMedia from './media/sagas/import-media-saga';
import watchStartChat from './chat-controls/start-chat-saga';
import watchPlayMedia from './media-remote/play-media-saga';
import {reducer as formReducer} from 'redux-form';
import navigatorReducer from './navigator/navigator-reducer';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        authentication: authenticationReducer,
        media: mediaReducer,
        form: formReducer,
        environment: environmentReducer,
        chatControls: chatControlsReducer,
        navigator: navigatorReducer,
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAuthentication);
sagaMiddleware.run(watchSaveMedia);
sagaMiddleware.run(watchFetchMedia);
sagaMiddleware.run(watchStartChat);
sagaMiddleware.run(watchImportMedia);
sagaMiddleware.run(watchOpenMediaFolder);
sagaMiddleware.run(watchPlayMedia);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
