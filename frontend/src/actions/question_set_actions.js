import * as APIUtil from '../util/question_set_api_util';

export const RECEIVE_ALL_QUESTION_SETS = 'RECEIVE_ALL_QUESTION_SETS';
export const RECEIVE_QUESTION_SET = 'RECEIVE_QUESTION_SET';
export const REMOVE_QUESTION_SET = 'REMOVE_QUESTION_SET';

export const receiveAllQuestionSets = questionSets => ({
    type: RECEIVE_ALL_QUESTION_SETS,
    questionSets
})

export const receiveQuestionSet = questionSet => ({
    type: RECEIVE_QUESTION_SET,
    questionSet,
});

const removeQuestionSet = id => ({
    type: REMOVE_QUESTION_SET,
    id
})

export const fetchAllQuestionSets = () => dispatch => (
    APIUtil.fetchAllQuestionSets().then(questionSets => (
        dispatch(receiveAllQuestionSets(questionSets))
    ))
);

export const fetchQuestionSet = id => dispatch => (
    APIUtil.fetchQuestionSet(id).then(questionSet => (
        dispatch(receiveQuestionSet(questionSet))
    ))
);

export const createQuestionSet = questionSet => dispatch => (
    APIUtil.createQuestionSet(questionSet).then(questionSet => (
        dispatch(receiveQuestionSet(questionSet))
    ))
);

export const updateQuestionSet = (questionSet) => dispatch => (
    APIUtil.updateQuestionSet(questionSet).then( questionSet => (
        dispatch (receiveQuestionSet(questionSet))))
);

export const deleteQuestionSet = (id) => dispatch => (
    APIUtil.deleteQuestionSet(id).then( () => (
        dispatch (removeQuestionSet(id))))
);

export const fetchUserQuestionSets = userId => dispatch => (
    APIUtil.fetchUserQuestionSets(userId).then(questionSets => (
        dispatch(receiveAllQuestionSets(questionSets))
    ))
);