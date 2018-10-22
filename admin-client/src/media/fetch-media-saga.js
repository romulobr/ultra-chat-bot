import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import cookies from 'browser-cookies';

function* fetchMedia(action) {
  console.log('trying to save media');
  try {
    const jwt = cookies.get('feathers-jwt');
    if (!jwt) {
      yield put({ type: 'NOT_AUTHENTICATED' });
      return;
    }
    const response = yield axios.get('http://localhost:3000/media', {
      headers: { Authorization: 'Bearer ' + jwt }
    });
    yield put({ type: 'MEDIA_FETCHED', items:response.data.data[0].items });
    console.log(response);
  } catch (e) {
    yield put({ type: 'MEDIA_FETCH_ERROR', error: e });
    console.log('got an error:', e);
  }
}

function* watchFetchMedia() {
  yield takeEvery('FETCH_MEDIA', fetchMedia);
}

export default watchFetchMedia;
