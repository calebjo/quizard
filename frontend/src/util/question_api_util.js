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

export const createQuestion = (questionData) => {
    return axios.post(
        `/api/questions/`, 
        questionData
    );
};
  
export const updateQuestion = (questionData) => {
    return axios.patch(
        `/api/questions/${questionData.id}`,
        questionData
    );
};

export const deleteQuestion = id => {
    return axios.delete(
        `/api/questions/${id}`
    );
};