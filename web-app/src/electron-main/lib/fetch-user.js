const userApi = require('../urls').userApi;
const axios = require('axios');

function fetchUser(jwt) {
    return axios.get(userApi, {
        headers: {Authorization: 'Bearer ' + jwt}
    });
}

module.exports = fetchUser;
