import {createAction} from 'redux-act';

const saveLoyalty = createAction('SAVE_LOYALTY_OLD');
const loyaltySaveFailed = createAction('LOYALTY_OLD_SAVE_FAILED');
const loyaltySaved = createAction('LOYALTY_OLD_SAVED');
const fetchLoyalty = createAction('FETCH_LOYALTY_OLD');
const loyaltyFetched = createAction('LOYALTY_OLD_FETCHED');
const loyaltyFetchFailed = createAction('LOYALTY_OLD_FETCH_FAILED');

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
