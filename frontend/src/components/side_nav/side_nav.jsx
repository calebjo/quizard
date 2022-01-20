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
        this.props.history.push("/");
        this.props.logout();
    }

    render () {
        const {currentUser} = this.props;

        return (
            <aside className="sidebar-nav">
                <div className="nav-flex">
                    <img className="logo--nav" src={QuizardLogo} alt="logo" onClick={() => this.props.history.push('/')}/>

                    {/* Link to current user profile- only rendered when logged in */}
                    { currentUser ? (
                        <NavLink to={`/users/${currentUser.id}`} activeClassName="selected"> 
                        <div className="sidebar-nav__icons">
                            <FontAwesomeIcon 
                                icon={faUser}
                                size="3x" />
                            <label>My profile</label>
                        </div>
                        </NavLink>
                    ) : null }
                    
                    {/* Link to question set index- always rendered */}
                    <NavLink to="/question-sets" activeClassName="selected"> 
                        <div className="sidebar-nav__icons">
                            <FontAwesomeIcon 
                                icon={faList}
                                size="3x" />
                            <label>Question Sets</label>
                        </div>
                    </NavLink>
                    
                    {/* Link to quiz set creator page- only rendered when logged in */}
                    { currentUser ? (
                        <NavLink to="/quiz-creator" activeClassName="selected"> 
                            <div className="sidebar-nav__icons">
                                <FontAwesomeIcon 
                                    icon={faPlus}
                                    size="3x" />
                                <label>Create a New Question Set</label>
                            </div>
                        </NavLink>
                    ) : null }

                </div>
                
                <div className="nav-flex">
                    {/* Button to join game in progress- always rendered */}
                    <button onClick={() => this.props.history.push("/join-game")}
                        className="styled-button orange-bg">
                            Join Game</button>

                    {/* Log out button- only rendered when logged in */}
                    { currentUser ? (
                        <button 
                            className="styled-button red-bg"
                            onClick={this.handleLogout}>Log Out</button>
                    ) : null }

                    {/* Create account button- only rendered when logged out */}
                    { currentUser ?  null : (
                        <button 
                            className="styled-button red-bg"
                            onClick={() => this.props.history.push("/signup")}>Create Account</button>)}

                </div>
            </aside>
        );
    }
}

export default SideNav;