import getSettingActionsFor from './settings-actions';
import {createReducer} from 'redux-act';

const deepmerge = require('deepmerge');

function getSettingsReducerFor(key) {
    const actions = getSettingActionsFor(key);
    const initialState = {
        loading: true
    };

    return createReducer({
            [actions.fetch]: (state, payload) => ({...state, enabled: false}),
            [actions.fetched]: (state, payload) => ({data: payload, enabled: true}),
            [actions.save]: (state, payload) => ({...state, data: payload, enabled: false}),
            [actions.saved]: (state, payload) => ({...state, data: payload, enabled: true}),
            [actions.error]: (state, payload) => ({...state, error: payload, enabled: false}),
            [actions.updateExtras]: (state, payload) => (deepmerge(state, payload))
        }, initialState
    );
}

export default getSettingsReducerFor;
