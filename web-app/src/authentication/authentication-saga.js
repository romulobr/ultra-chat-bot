import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import cookies from 'browser-cookies';

function* authenticate() {
  try {
    const jwt = cookies.get('feathers-jwt') || "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiI1YmQ0NzZlNGJiNTUzZjgzNTE1YzdiZWIiLCJpYXQiOjE1NDA2NTA3MjUsImV4cCI6MTU0MDczNzEyNSwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6MzAwMCIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiYW5vbnltb3VzIiwianRpIjoiNmEzYTY0YzktNGMzMy00NzA5LWE5MGQtMWFkYTVmYWY0NjNiIn0.-1ns7e5INe0EqG8t30A6qA7fnJv4Nk1fRCaxwEjFaDM";
    if (!jwt) {
      yield put({ type: 'NOT_AUTHENTICATED' });
      return;
    }
    const response = yield axios.get('http://localhost:3000/users', {
      headers: { Authorization: 'Bearer ' + jwt }
    });
    yield put({ type: 'AUTHENTICATION_SUCCESS', user: response.data });
    yield put({ type: 'FETCH_MEDIA' });
  } catch (e) {
    yield put({ type: 'AUTHENTICATION_FAILED', error: e });
    console.log('got an error:', e);
  }
}

function* watchAuthentication() {
  yield takeEvery('AUTHENTICATION', authenticate);
}

export default watchAuthentication;
