import {createAction} from 'redux-act';

const chickenMove = createAction('CHICKEN_MOVE');
const chickenSpeak = createAction('CHICKEN_SPEAK');

export {chickenMove, chickenSpeak};

export default {
    chickenMove,chickenSpeak
};
