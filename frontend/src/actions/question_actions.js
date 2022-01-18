import * as APIUtil from '../util/question_api_util';

export const RECEIVE_ALL_QUESTIONS = 'RECEIVE_ALL_QUESTIONS';
export const RECEIVE_QUESTION = 'RECEIVE_QUESTION';
export const REMOVE_QUESTION = 'REMOVE_QUESTION';

export const receiveAllQuestions = questions => ({
    type: RECEIVE_ALL_QUESTIONS,
    questions
})

export const receiveQuestion = question => ({
    type: RECEIVE_QUESTION,
    question,
});

const removeQuestion = id => ({
    type: REMOVE_QUESTION,
    id
})

export const fetchQuestions = () => dispatch => (
    APIUtil.fetchQuestions().then(questions => (
        dispatch(receiveAllQuestions(questions))
    ))
);

export const fetchQuestion = id => dispatch => (
    APIUtil.fetchQuestion(id).then(question => (
        dispatch(receiveQuestion(question))
    ))
);

export const createQuestion = question => dispatch => (
    APIUtil.createQuestion(question).then(question => (
        dispatch(receiveQuestion(question))
    ))
);

export const updateQuestion = (question) => dispatch => (
    APIUtil.updateQuestion(question).then( question => (
        dispatch (receiveQuestion(question))))
);

export const deleteQuestion = (id) => dispatch => (
    APIUtil.deleteQuestion(id).then( () => (
        dispatch (removeQuestion(id))))
);