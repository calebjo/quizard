
import React from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
// import { Switch, Route } from 'react-router-dom';
import './app.scss';
import { Switch, Route } from 'react-router-dom';
import SplashPage from './splash/splash_page'
import SignupFormContainer from './session/signup_form_container';
import LoginFormContainer from './session/login_form_container';

const App = () => (
    <div className="app">
        <Switch>
            <Route exact path="/login" component={LoginFormContainer} />
            <Route exact path="/signup" component={SignupFormContainer} />
            <Route exact path="/" component={SplashPage} />
        </Switch>
    </div>
);

export default App;