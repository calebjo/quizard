
import React from 'react';
import io from "socket.io-client";

// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import './app.scss';
import { Switch, Route } from 'react-router-dom';
import SplashPage from './splash/splash_page'
import SignupFormContainer from './session/signup_form_container';
import LoginFormContainer from './session/login_form_container';

import SideNavContainer from './side_nav/side_nav_container';
import UserShowContainer from './user/user_show_container';
import EditUserFormContainer from './user/edit_user_form_container';
import QuestionSetIndexContainer from './question_set/question_set_index_container';

import GameLobbyContainer from './game/game_lobby_container'; {/* DEBUG -- REMOVE OR CONFLICT*/}
import QuestionSetShowContainer from './question_set/question_set_show_container';
import NewQuestionSetFormContainer from './question_set/new_question_set_form_container';

const App = () => (
    <div className="app">
        {/* <SideNavContainer /> */}
        <Route path="/users/:id" component={SideNavContainer}/> {/* VK: temp code for styling purposes */}
        <Route path="/edit-profile" component={SideNavContainer}/>
        <Route path="/question-sets" component={SideNavContainer} />
        <Route path="/play" component={GameLobbyContainer} /> {/* DEBUG -- REMOVE OR CONFLICT */}
        <Route path="/quiz-creator" component={SideNavContainer} />
        <Switch>
            <Route exact path="/quiz-creator" component={NewQuestionSetFormContainer} />
            <Route exact path="/question-sets/:id" component={QuestionSetShowContainer} />
            <Route exact path="/question-sets" component={QuestionSetIndexContainer} />
            <Route exact path="/edit-profile" component={EditUserFormContainer} />
            <Route exact path="/users/:id" component={UserShowContainer} />
            <Route exact path="/login" component={LoginFormContainer} />
            <Route exact path="/signup" component={SignupFormContainer} />
            <Route exact path="/" component={SplashPage} />
        </Switch>
    </div>
);

export default App;
export const socket = io.connect("http://localhost:4000");