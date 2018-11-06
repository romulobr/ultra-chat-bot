import {createAction} from 'redux-act';

const fetchYoutubeBroadcasts = createAction('FETCH_YOUTUBE_BROADCASTS');
const fetchYoutubeBroadcastsSuccess = createAction('FETCH_BROADCASTS_SUCCESS');
const fetchYoutubeBroadcastsFailed = createAction('FETCH_BROADCASTS_FAILED');


export {fetchYoutubeBroadcasts};
export {fetchYoutubeBroadcastsSuccess};
export {fetchYoutubeBroadcastsFailed};

export default {
    fetchYoutubeBroadcasts, fetchYoutubeBroadcastsFailed, fetchYoutubeBroadcastsSuccess
};
