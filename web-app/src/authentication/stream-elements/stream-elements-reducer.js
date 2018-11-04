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
            isLoading: false,
            token: payload.token
        }),
    [actions.fetchTokenFailed]: (state, payload) => (
        {
            ...state,
            error: payload,
            isEditing: false,
            isLoading: false,
            tokenUser:''
        }),
    [actions.editToken]: (state) => (
        {
            ...state,
            isEditing: true,
            isLoading: false
        }),
    [actions.editTokenCancelled]: (state) => (
        {
            ...state,
            isEditing: false
        }),
    [actions.saveToken]: (state) => (
        {
            ...state,
            isEditing: false
        }),
    [actions.saveTokenSuccess]: (state, payload) => (
        {
            ...state,
            token: payload,
            isEditing: false,
            tokenUser:''
        }),
    [actions.saveTokenFailed]: (state, payload) => (
        {
            ...state,
            isEditing: false,
            error: payload
        }),
    [actions.tokenVerificationSuccess]: (state, payload) => (
        {
            ...state,
            isEditing: false,
            tokenUser: payload
        }),
    [actions.tokenVerificationFailed]: (state, payload) => (
        {
            ...state,
            isEditing: false,
            tokenUser: 'Bad Token?'
        })
}, {
    token: '',
    isEditing: false,
    isLoading: true
});

export default streamElementsReducer;
