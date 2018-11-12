import {createReducer} from 'redux-act';
import actions from './stream-labs-actions';

const streamElementsReducer = createReducer({
    [actions.fetch]: (state, payload) => (
        {
            ...state,
            isLoading: true
        }),
    [actions.fetchSuccess]: (state, payload) => (
        {
            ...state,
            isLoading: false,
            ...payload
        }),
    [actions.fetchFailed]: (state, payload) => (
        {
            ...state,
            error: payload,
            isLoading: false,
            tokenUser: ''
        }),
    [actions.disconnectStreamlabs]: (state, payload) => (
        {
            isLoading: true,
            tokenUser: ''
        })

}, {
    isLoading: true
});

export default streamElementsReducer;
