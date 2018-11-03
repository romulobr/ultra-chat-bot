import authenticationActions from '../authentication/authentication-actions';
import actions from './navigation-actions';
import {createReducer} from 'redux-act';

const navigatorReducer = createReducer({
    [authenticationActions.notAuthenticated]: (state, payload) => ({view: 'authentication'}),
    [authenticationActions.authenticationSuccess]: (state, payload) => ({view: 'authentication'}),
    [actions.navigateTo]: (state, payload) => ({view: payload})
}, {view: 'authentication'});

export default navigatorReducer;
