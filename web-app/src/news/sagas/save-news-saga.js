import {newsApi} from '../../urls';
import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../../authentication/jwt';
import actions from '../news-actions';
import {notAuthenticated} from '../../authentication/authentication-actions';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* saveNews(action) {
    console.log('trying to save news \n\n', action);
    try {
        const jwt = getSavedToken();
        if (!jwt) {
            yield put(notAuthenticated());
            return;
        }
        console.log('saving news: ', action);
        const response = yield axios.put(newsApi, action.payload, {
            headers: {Authorization: 'Bearer ' + jwt}
        });
        yield delay(1000);
        yield put(actions.newsSaved({...response.data}));
    } catch (e) {
        console.log('error saving news', e);
        yield put(actions.newsSaveFailed({error: e}));
    }
}

function* watchSaveNews() {
    yield takeEvery(actions.saveNews, saveNews);
}

export default watchSaveNews;
