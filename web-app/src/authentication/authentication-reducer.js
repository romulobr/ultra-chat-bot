import {createReducer} from 'redux-act';
import actions from './authentication-actions';

const authenticationReducer = createReducer({
    [actions.authenticationSuccess]: (state, payload) => ({
        ...state,
        connected: true,
        loading: false,
        user: payload.user,
    }),
    [actions.authenticationFailed]: (state, payload) => ({
        ...state,
        connected: false,
        loading: false,
        connectionError: {
            ...payload.error
        }
    }),
    [actions.notAuthenticated]: (state, payload) => (
        {
            ...state,
            connected: false,
            loading: false,
            user: null
        })
}, {
    connected: false,
    loading: true,
    token: '',
    isEditing: false
});

export default authenticationReducer;
