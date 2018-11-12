import {createAction} from 'redux-act';

const fetchStreamlabs = createAction('FETCH_STREAMLABS_DATA');
const fetchSuccess = createAction('FETCH_STREAMLABS_DATA_SUCCESS');
const fetchFailed = createAction('FETCH_STREAMLABS_DATA_FAILED');
const connectStreamlabs = createAction('CONNECT_STREAMLABS');
const disconnectStreamlabs = createAction('DISCONNECT_STREAMLABS');

export {fetchStreamlabs}
export {connectStreamlabs};
export {disconnectStreamlabs};
export {fetchSuccess};
export {fetchFailed};

export default {
    fetchStreamlabs, fetchSuccess, fetchFailed, connectStreamlabs, disconnectStreamlabs
}
