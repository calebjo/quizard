
import React from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import './app.scss';
import { Switch, Route } from 'react-router-dom';
import SplashPage from './splash/splash_page'
import SignupFormContainer from './session/signup_form_container';
import LoginFormContainer from './session/login_form_container';

import SideNavContainer from './side_nav/side_nav_container';
import UserShowContainer from './user/user_show_container';
import EditUserFormContainer from './user/edit_user_form_container';

const App = () => (
    <div className="app">
        {/* <SideNavContainer /> */}
        <Route path="/users/:id" component={SideNavContainer}/> {/* VK: temp code for styling purposes */}
        <Route path="/edit-profile" component={SideNavContainer}/>

        <Switch>
            <Route exact path="/edit-profile" component={EditUserFormContainer} />
            <Route exact path="/users/:id" component={UserShowContainer} />
            <Route exact path="/login" component={LoginFormContainer} />
            <Route exact path="/signup" component={SignupFormContainer} />
            <Route exact path="/" component={SplashPage} />
        </Switch>
    </div>
);

export default App;