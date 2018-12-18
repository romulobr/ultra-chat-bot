import {newsApi, settingsFileApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../../authentication/jwt';
import actions from '../news-actions';
import {notAuthenticated} from '../../authentication/authentication-actions'

function* fetchNews() {
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put(notAuthenticated());
            return;
        }
        const getResponse = yield axios.get(newsApi, {
            headers: {Authorization: 'Bearer ' + jwt}
        });
        if (getResponse.data && getResponse.data[0]) {
            yield put(actions.newsFetched({...getResponse.data[0]}));
        } else {
            const savedData = yield axios.get(settingsFileApi + '/news');
            delete savedData.data._id;
            yield axios.post(newsApi, savedData.data, {headers: {Authorization: 'Bearer ' + jwt}});
            yield put(actions.fetchNews());
        }
    } catch (e) {
        yield put(actions.newsFetchFailed({error: e}));
        console.log('got an error:', e);
    }
}

function* watchFetchNews() {
    yield takeEvery(actions.fetchNews, fetchNews);
}

export default watchFetchNews;
