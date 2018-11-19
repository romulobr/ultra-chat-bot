import cookies from 'browser-cookies';
import {notAuthenticated} from "./authentication-actions";

const ipcRenderer = require('electron').ipcRenderer;

function deauthenticate(dispatch, origin) {
    cookies.erase('feathers-jwt');
    //ipcRenderer.send('deauthenticate');
    // dispatch(notAuthenticated());
}

export default deauthenticate;
