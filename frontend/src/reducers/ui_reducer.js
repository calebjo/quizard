import { combineReducers } from "redux";
import lastQuestionSetReducer from "./last_question_set_reducer";

const uiReducer = combineReducers({
    lastQuestionSet: lastQuestionSetReducer
});

export default uiReducer;