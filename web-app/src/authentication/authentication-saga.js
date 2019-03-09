import {userApi} from '../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from './jwt';
import actions from './authentication-actions';
import {fetchToken} from './stream-elements/stream-elements-actions';


function userFrom(data, originalUser) {
    const newUser = {origin: 'multi'};
    if (originalUser) {
        if (originalUser.origin === 'multi') {
            newUser.youtube = originalUser.youtube;
            newUser.twitch = originalUser.twitch;
        } else {
            newUser[originalUser.origin] = originalUser;
        }
        newUser._id = originalUser._id;
        newUser[data.origin] = data;
        return newUser;
    } else {
        if (data.origin !== 'multi') {
            newUser[data.origin] = data;
            newUser._id = data._id;
            newUser.origin = 'multi';
            return newUser;
        } else {
            return data;
        }
    }
}

function* authenticate(action) {
    try {
        const token = getSavedToken();
        if (!token) {
            yield put(actions.notAuthenticated());
            return;
        }
        const response = yield axios.get(userApi, {
            headers: {Authorization: 'Bearer ' + token}
        });
        const currentUser = action.payload;
        const upToDateUser = userFrom(response.data, currentUser);

        if (JSON.stringify(upToDateUser) !== JSON.stringify(currentUser)) {
            yield axios.put(userApi, upToDateUser, {
                headers: {Authorization: 'Bearer ' + token}
            });
        }
        yield put(actions.authenticationSuccess({user: upToDateUser}));
        yield put(fetchToken());
    } catch (e) {
        yield put(actions.authenticationFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchAuthentication() {
    yield takeEvery(actions.authentication, authenticate);
}

export default watchAuthentication;
