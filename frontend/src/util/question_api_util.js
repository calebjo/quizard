import axios from 'axios';

export const fetchSetQuestions = (setId) => {
    return axios.get(
        `/api/questions/question_sets/${setId}`
    );
};

export const fetchQuestions = () => {
    return axios.get(
        `/api/questions`
    );
};

export const fetchQuestion = id => {
    return axios.get(
        `/api/questions/${id}`
    );
};

export const createQuestion = (id, questionData) => {
    return axios.post(
        `/api/questions/${id}`, 
        questionData
    );
};
  
export const updateQuestion = (id, questionData) => {
    return axios.patch(
        `/api/questions/${id}`,
        questionData
    );
};

export const deleteQuestion = id => {
    return axios.delete(
        `/api/questions/${id}`
    );
};