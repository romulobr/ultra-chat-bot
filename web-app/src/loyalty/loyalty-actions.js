import {createAction} from 'redux-act';

const saveLoyalty = createAction('SAVE_LOYALTY');
const loyaltySaveFailed = createAction('LOYALTY_SAVE_FAILED');
const loyaltySaved = createAction('LOYALTY_SAVED');
const fetchLoyalty = createAction('FETCH_LOYALTY');
const loyaltyFetched = createAction('LOYALTY_FETCHED');
const loyaltyFetchFailed = createAction('LOYALTY_FETCH_FAILED');

export {saveLoyalty};
export {loyaltyFetched};
export {loyaltyFetchFailed};
export {loyaltySaveFailed};
export {loyaltySaved};
export {fetchLoyalty};

export default {
    fetchLoyalty,
    loyaltyFetched,
    loyaltyFetchFailed,
    saveLoyalty,
    loyaltySaved,
    loyaltySaveFailed
};
