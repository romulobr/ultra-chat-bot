import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import authenticationReducer from './authentication/authentication-reducer';
import mediaReducer from './media/media-reducer';
import createSagaMiddleware from 'redux-saga';
import watchAuthentication from './authentication/authentication-saga';
import watchSaveMedia from './media/save-media-saga';
import watchFetchMedia from './media/fetch-media-saga';
import { reducer as formReducer } from 'redux-form';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    authentication: authenticationReducer,
    media: mediaReducer,
    form: formReducer
  }),
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAuthentication);
sagaMiddleware.run(watchSaveMedia);
sagaMiddleware.run(watchFetchMedia);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
