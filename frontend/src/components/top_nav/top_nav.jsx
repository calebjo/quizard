import React from 'react'
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
                    Meet the Developers
                </div>
                <div className="top-nav__session">
                    Login/Sign up
                </div>
            </div>
        )
    }   
}

export default TopNav;