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
        this.props.logout();
    }

    render () {
        const {currentUser} = this.props;

        return (
            <aside className="sidebar-nav">
                <div className="nav-flex">
                    <img className="logo--nav" src={QuizardLogo} alt="logo" />

                    {/* Link to current user profile- only rendered when logged in */}
                    { currentUser.id ? (
                        <NavLink to={`/users/${currentUser.id}`} activeClassName="selected"> 
                        <div className="sidebar-nav__icons">
                            <FontAwesomeIcon 
                                icon={faUser}
                                size="3x" />
                            <label>My profile</label>
                        </div>
                        </NavLink>
                    ) : null }
                    
                    {/* Link to quiz set index- always rendered */}
                    <NavLink to="/quiz-sets" activeClassName="selected"> 
                        <div className="sidebar-nav__icons">
                            <FontAwesomeIcon 
                                icon={faList}
                                size="3x" />
                            <label>Quiz Sets</label>
                        </div>
                    </NavLink>
                    
                    {/* Link to quiz set creator page- only rendered when logged in */}
                    { currentUser.id ? (
                        <NavLink to="/quiz-creator" activeClassName="selected"> 
                            <div className="sidebar-nav__icons">
                                <FontAwesomeIcon 
                                    icon={faPlus}
                                    size="3x" />
                                <label>Create a New Quiz Set</label>
                            </div>
                        </NavLink>
                    ) : null }

                </div>
                
                <div className="nav-flex">
                    {/* SKELETON: must add link to join game!! */}
                    <button 
                        className="styled-button orange-bg">
                            Join Game</button>

                    {/* Log out button- only rendered when logged in */}
                    { currentUser.id ? (
                        <button 
                            className="styled-button red-bg"
                            onClick={this.handleLogout}>Log Out</button>
                    ) : null }

                </div>
            </aside>
        );
    }
}

export default SideNav;