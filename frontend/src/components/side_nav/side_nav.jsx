import React from "react";
import QuizardLogo from '../../assets/images/quizard-logo.png';
import "./side_nav.scss";
import {NavLink} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faList, faPlus } from '@fortawesome/free-solid-svg-icons';

// NOTE: components rendered alongside the side nav will need to have a padding-left of 20vw
// to account for this sidebar


class SideNav extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout (e) {
        e.preventDefault();
        console.log("user logged out");
    }

    render () {
        return (
            <aside className="sidebar-nav">
                <div className="nav-flex">
                    <img className="logo--nav" src={QuizardLogo} alt="logo" />

                    <NavLink to="/users/1" activeClassName="selected"> 
                    {/* SKELETON: Replace the link address above with "/users/${currentUser.id}" when current user prop is available */}
                        <div className="sidebar-nav__icons">
                            <FontAwesomeIcon 
                                icon={faUser}
                                size="3x" />
                            <label>My profile</label>
                        </div>
                    </NavLink>

                    <NavLink to="/quiz-sets" activeClassName="selected"> 
                        <div className="sidebar-nav__icons">
                            <FontAwesomeIcon 
                                icon={faList}
                                size="3x" />
                            <label>Quiz Sets</label>
                        </div>
                    </NavLink>

                    <NavLink to="/quiz-creator" activeClassName="selected"> 
                        <div className="sidebar-nav__icons">
                            <FontAwesomeIcon 
                                icon={faPlus}
                                size="3x" />
                            <label>Create a New Quiz Set</label>
                        </div>
                    </NavLink>
                </div>
                
                <button 
                    className="styled-button red-bg"
                    onClick={this.handleLogout}>Log out</button>
            </aside>
        );
    }
}

export default SideNav;