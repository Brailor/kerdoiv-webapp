import {
    SEND_LOGIN,
    SAVE_QLLIST,
    SAVE_QUESTIONNAIRES,
    FETCH_USER,
    SET_SUBJECTS
} from './actionList';
import { API } from '../middleware/index';

export const saveQuestionList = qlList => ({
    type: SAVE_QLLIST,
    data: qlList
});

export const saveQuestionnaires = qlList => ({
    type: SAVE_QUESTIONNAIRES,
    data: qlList
});

export const fetchUser = () => async dispatch => {
    const res = await API.get('current-user');

    dispatch(saveUser(res));
};

export const saveUser = data => ({
    type: FETCH_USER,
    data
});

export const setSubjects = data => ({
    type: SET_SUBJECTS,
    data
});
