
import React from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
// import { Switch, Route } from 'react-router-dom';
import './app.scss'
import SplashPage from './splash/splash_page'

const App = () => (
    <div className="app">
        {/* REMOVE FOR ROUTING */}
        <SplashPage />
    </div>
);

export default App;