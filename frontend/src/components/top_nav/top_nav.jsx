import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import './top_nav.scss'
import QuizardLogo from '../../assets/images/quizard-logo.png'
// SKELETON -- no session functionality, login/sign up should make session modal
class TopNav extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="top-nav">
                <div className="top-nav__logo">
                    <img 
                        className="logo--large"
                        src={QuizardLogo} 
                        alt="Logo"/>
                </div>
                <div className="top-nav__developers">
                    {/* SKELETON -- Change to an anchor link to splash-page__links */}
                    <HashLink to="/#splash-page__bottom">About Quizard</HashLink>
                </div>
                <div className="top-nav__session">
                    <Link to="/login">Login/Sign up</Link>
                </div>
            </div>
        )
    }   
}

export default TopNav;