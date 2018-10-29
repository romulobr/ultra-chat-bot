const axios = require('axios');

function fetchUser(jwt) {
    return axios.get('http://localhost:3000/users', {
        headers: {Authorization: 'Bearer ' + jwt}
    });
}

module.exports = fetchUser;
