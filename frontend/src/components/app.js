
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import './app.scss';
import { Switch, Route } from 'react-router-dom';
import SplashPage from './splash/splash_page'
import SignupFormContainer from './session/signup_form_container';
import LoginFormContainer from './session/login_form_container';

import SideNavContainer from './side_nav/side_nav_container';
import UserShowContainer from './user/user_show_container';
import EditUserFormContainer from './user/edit_user_form_container';
import QuestionSetIndexContainer from './question_set/question_set_index_container';
import QuestionSetShowContainer from './question_set/question_set_show_container';
import NewQuestionSetFormContainer from './question_set/new_question_set_form_container';
import QuestionEditFormContainer from './question/question_edit_form_container';

const App = () => (
    <div className="app">
        {/* <SideNavContainer /> */}
        <Route path="/users/:id" component={SideNavContainer}/>
        <ProtectedRoute path="/edit-profile" component={SideNavContainer}/>
        <Route path="/question-sets" component={SideNavContainer} />
        <Route path="/quiz-creator" component={SideNavContainer} />

        <Switch>
            <Route exact path="/quiz-creator" component={NewQuestionSetFormContainer} />
            <Route exact path="/question-sets/:id/edit" component={QuestionEditFormContainer} />
            <Route exact path="/question-sets/:id" component={QuestionSetShowContainer} />
            <Route exact path="/question-sets" component={QuestionSetIndexContainer} />
            <ProtectedRoute exact path="/edit-profile" component={EditUserFormContainer} />
            <Route exact path="/users/:id" component={UserShowContainer} />
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            <AuthRoute exact path="/" component={SplashPage} />
        </Switch>
    </div>
);

export default App;