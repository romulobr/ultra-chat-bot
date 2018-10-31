import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import getSavedToken from '../authentication/jwt';

function validateItems(items) {
  const validation = { hasErrors: false, items: [] };
  items.forEach(item => {
    if (!item.url || !item.command) {
      validation.items.push({
        ...item,
        hasValidationError: true,
        validationError: 'no-blank'
      });
      validation.hasErrors = true;
    } else {
      validation.items.push(item);
    }
  });
  return validation;
}

function* saveMedia(action) {
  console.log('trying to save media \n\n',action);
  try {
    const validation = validateItems(action.items);
    if (validation.hasErrors) {
      yield put({ type: 'MEDIA_VALIDATION_ERRORS', validation });
      return;
    } else {
      const jwt = getSavedToken();
        if (!jwt) {
        yield put({ type: 'NOT_AUTHENTICATED' });
        return;
      }
      console.log('saving media: ', action)
      const response = yield axios.put('http://localhost:3000/api/media', {items:action.items},{
        headers: { Authorization: 'Bearer ' + jwt }
      });
      yield put({ type: 'MEDIA_SAVED', items:response.data.items });
      console.log(response);
    }
  } catch (e) {
    yield put({ type: 'MEDIA_SAVING_ERROR', error: e });
    console.log('got an error:', e);
  }
}

function* watchSaveMedia() {
  yield takeEvery('SAVE_MEDIA', saveMedia);
}

export default watchSaveMedia;
