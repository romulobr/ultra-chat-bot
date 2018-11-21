import actions from './chicken-controls-actions';
import {createReducer} from 'redux-act';

const initialState = {
    items: [],
    loading: true
};

const chickenReducer = createReducer({
        [actions.saveChicken]: (state, payload) => ({...state,...payload, loading: true}),
        [actions.chickenSaved]: (state, payload) => ({...payload, loading: false}),
        [actions.chickenSaveFailed]: (state, payload) => ({...state, loading: false,error:payload}),
        [actions.fetchChicken]: (state, payload) => ({...state, loading: true}),
        [actions.chickenFetched]: (state, payload) => ({...state,...payload, loading: false})
    }, initialState
);

export default chickenReducer;
