import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import questionsReducer from "./questions_reducer"
import questionSetsReducer from "./question_sets_reducer"
import lobbiesReducer from "./lobbies_reducer";

const entitiesReducer = combineReducers({
    users: usersReducer,
    questions: questionsReducer,
    questionSets: questionSetsReducer,
    lobbies: lobbiesReducer
});

export default entitiesReducer;