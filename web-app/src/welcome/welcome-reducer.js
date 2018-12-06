import actions from './welcome-actions';
import {createReducer} from 'redux-act';

const initialState = {
    loading: true
};

const welcomeReducer = createReducer({
        [actions.saveWelcome]: (state, payload) => ({...state, data: payload, loading: true}),
        [actions.welcomeSaved]: (state, payload) => ({data: payload, loading: false}),
        [actions.welcomeSaveFailed]: (state, payload) => ({...state, loading: false, error: payload}),
        [actions.fetchWelcome]: (state) => ({...state, loading: true}),
        [actions.welcomeFetched]: (state, payload) => ({...state, data: payload, loading: false})
    }, initialState
);

export default welcomeReducer;
