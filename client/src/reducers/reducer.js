import {
    SAVE_QLLIST,
    SAVE_QUESTIONNAIRES,
    FETCH_USER,
    SET_SUBJECTS
} from '../actions/actionList';
import initialState from './initial';

const reducer = (state = initialState, action) => {
    if (action.type === FETCH_USER) {
        return Object.assign({}, state, { auth: action.data });
    }
    if (action.type === SAVE_QLLIST) {
        return Object.assign({}, state, action.data);
    }
    if (action.type === SAVE_QUESTIONNAIRES) {
        return Object.assign({}, state, action.data);
    }

    if (action.type === SET_SUBJECTS) {
        return Object.assign({}, state, { subjects: action.data });
    }

    return state;
};

export default reducer;
