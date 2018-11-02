import cookies from 'browser-cookies';

function getSavedToken() {
    return cookies.get('feathers-jwt');
}

export default getSavedToken;
