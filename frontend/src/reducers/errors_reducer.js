import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_errors_reducer';
import UserErrorsReducer from './user_errors_reducer';
import QuestionSetErrorsReducer from './question_set_errors_reducer';
import QuestionErrorsReducer from './question_errors_reducer';

export default combineReducers({
    session: SessionErrorsReducer,
    user: UserErrorsReducer,
    questionSet: QuestionSetErrorsReducer,
    question: QuestionErrorsReducer
});