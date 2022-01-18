import axios from 'axios';

export const fetchUserQuestionSets = (userId) => {
    return axios.get(
        `/api/question_sets/users/${userId}`
    );
};

export const fetchAllQuestionSets = () => {
    return axios.get(
        `/api/question_sets`
    );
};

export const fetchQuestionSet = id => {
    return axios.get(
        `/api/question_sets/${id}`
    );
};

export const createQuestionSet = (questionSetData) => {
    return axios.post(
        `/api/question_sets/`, 
        questionSetData
    );
};
  
export const updateQuestionSet = (id, questionSetData) => {
    return axios.patch(
        `/api/question_sets/${id}`,
        questionSetData
    );
};

export const deleteQuestionSet = id => {
    return axios.delete(
        `/api/question_sets/${id}`
    );
};