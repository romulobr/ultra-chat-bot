import {createReducer} from 'redux-act';
import actions from './stream-elements-actions';

const streamElementsReducer = createReducer({
    [actions.fetchToken]: (state, payload) => (
        {
            ...state,
            isEditing: false,
            isLoading: true
        }),
    [actions.fetchTokenSuccess]: (state, payload) => (
        {
            ...state,
            isEditing: false,
            isLoading: false
        }),
    [actions.fetchTokenFailed]: (state, payload) => (
        {
            ...state,
            error: payload,
            isEditing: false,
            isLoading: false
        }),
    [actions.editToken]: (state, payload) => (
        {
            ...state,
            isEditing: true,
            isLoading: false
        }),
    [actions.editTokenCancelled]: (state, payload) => (
        {
            ...state,
            isEditing: false
        }),
    [actions.saveToken]: (state, payload) => (
        {
            ...state,
            isEditing: false,
            token: payload
        })
}, {
    token: '',
    isEditing: false,
    isLoading: true
});

export default streamElementsReducer;
