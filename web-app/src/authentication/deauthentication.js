import cookies from 'browser-cookies';

const ipcRenderer = require('electron').ipcRenderer;

function deauthenticate(dispatch) {
    cookies.erase('feathers-jwt');
    ipcRenderer.send('deauthenticate');
    dispatch({type: 'NOT_AUTHENTICATED'});
}

export default deauthenticate;
