import actions from './loyalty-actions';
import {createReducer} from 'redux-act';

const initialState = {
    loading: true
};

const loyaltyReducer = createReducer({
        [actions.saveLoyalty]: (state, payload) => ({...state, data: payload, loading: true}),
        [actions.loyaltySaved]: (state, payload) => ({data: payload, loading: false}),
        [actions.loyaltySaveFailed]: (state, payload) => ({...state, loading: false, error: payload}),
        [actions.fetchLoyalty]: (state, payload) => ({...state, loading: true}),
        [actions.loyaltyFetched]: (state, payload) => ({...state, data: payload, loading: false})
    }, initialState
);

export default loyaltyReducer;
