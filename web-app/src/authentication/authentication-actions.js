import {createAction} from 'redux-act';

const authentication = createAction('AUTHENTICATION');
const authenticationSuccess = createAction('AUTHENTICATION_SUCCESS');
const authenticationFailed = createAction('AUTHENTICATION_FAILED');
const notAuthenticated = createAction('NOT_AUTHENTICATED');

export {authenticationSuccess};
export {authenticationFailed};
export {notAuthenticated};
export {authentication};

export default {
    authenticationSuccess,
    authenticationFailed,
    notAuthenticated,
    authentication
}
