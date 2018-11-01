import {createReducer} from 'redux-act';
import actions from './authentication-actions';

const authenticationReducer = createReducer({
    [actions.authenticationSucess]: (state, payload) => ({
        connected: true,
        loading: false,
        user: payload.user
    }),
    [actions.authenticationFailed]: (state, payload) => ({
        connected: false,
        loading: false,
        connectionError: {
            ...payload.error
        }
    }),
    [actions.notAuthenticated]: (state, payload) => (
        {
            connected: false,
            loading: false
        })
}, {
    connected: false,
    loading: true
});

export default authenticationReducer;
