import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import cookies from 'browser-cookies';

function* fetchMedia(action) {
  console.log('trying to fetch media');
  try {
    const jwt = cookies.get('feathers-jwt');
    if (!jwt) {
      yield put({ type: 'NOT_AUTHENTICATED' });
      return;
    }
    const getResponse = yield axios.get('http://localhost:3000/media', {
      headers: { Authorization: 'Bearer ' + jwt }
    });
    console.log('got a response fetching media:', getResponse);
    if (getResponse.data.data[0]) {
      yield put({
        type: 'MEDIA_FETCHED',
        items: getResponse.data.data[0].items
      });
    } else {
      const postResponse = yield axios.post(
        'http://localhost:3000/media',
        { items: [] },
        {
          headers: { Authorization: 'Bearer ' + jwt }
        }
      );
      yield put({ type: 'FETCH_MEDIA'});
    }
  } catch (e) {
    yield put({ type: 'MEDIA_FETCH_ERROR', error: e });
    console.log('got an error:', e);
  }
}

function* watchFetchMedia() {
  yield takeEvery('FETCH_MEDIA', fetchMedia);
}

export default watchFetchMedia;
