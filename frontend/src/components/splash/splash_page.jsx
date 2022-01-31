import React from 'react'
import './splash_page.scss'

import caleb from "../../assets/images/photo-caleb.png"
import virginia from "../../assets/images/photo-virginia.png"
import julio from "../../assets/images/photo-julio.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import { faAngellist } from '@fortawesome/free-brands-svg-icons'

// SKELETON -- To be replaced with TopNavContainer for login/signup
import TopNav from '../top_nav/top_nav'

class SplashPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            quote: "Oh no, we've got an ugly one this time...",
            screenWidth: window.innerWidth,
            joinButtonText: "Join Game",
            createButtonText: "Create Quiz",
        }
    }

    componentDidMount() {
        // set random quote text on reload
        this.randomQuoteText()
        // change button text on small/large screens
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    componentWillUnmount () {
        // this should get rid of the weird memory leak error
        this.setState = () => { return; };
    }
    
    resize() {
        this.setState({
            screenWidth: window.innerWidth
        })
        // if screen is over the breakpoint, make the buttons have more text
        if ( this.state.screenWidth >= 770) {
            this.setState({
                joinButtonText: "Join Game",
                createButtonText: "Choose Quiz"
            })
        } else {
            this.setState({
                joinButtonText: "Join",
                createButtonText: "Choose"
            })
        }
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this));
    }

    randomQuoteText() {
        const quotes = [
            "Oh no, we've got an ugly one this time...",
            "Haven't I seen you before? What a shame.",
            "You should take a break, screens aren't good for you.",
            "Aren't you the one that lost TERRIBLY last time?",
            "You have no one to blame but yourself!",
            "I think I've seen you before... medicine commercial?",
            "You miss 100% of the shots that you take!",
            "Sometimes giving up is better than...whatever you're doing.",
            "Ah! A fresh face... well, 'fresh' might be pushing it.",
            "You could fill a warehouse with the things you don't know!",
            "Yikes! Are you well?"
        ]
        
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        this.setState({
            quote: randomQuote
        })
    }

    render() {
        // hard-coded text for now, change later
        return (
            <div className="splash-page__container">
                <div className="splash-page__main">
                    {/* SKELETON -- To be replaced with TopNavContainer for login/signup*/}
                    <TopNav />
                    <div className="splash-page__center">
                        <div className="splash-page__wizard-container">
                            <div className="splash-page__wizard-quotes">
                                <div className="splash-page__quote-box">
                                    <span>{ this.state.quote }</span>
                                </div>
                                <div className="splash-page__quote-triangle" />
                            </div>
                            <div className="splash-page__wizard-sprite">
                                🧙
                            </div>
                        </div>
                        <div className="splash-page__title">
                            <div className="splash-page__buttons">
                                <button
                                    className="splash-page__center-button"
                                    onClick={(e) => {e.preventDefault(); this.props.history.push("/join-game")}}>
                                    { this.state.joinButtonText }
                                </button>
                                <button
                                    className="splash-page__center-button"
                                    onClick={(e) => {e.preventDefault(); this.props.history.push("/question-sets")}}>
                                    { this.state.createButtonText }
                                </button>
                            </div>
                            <div className="splash-page__tagline">
                                Do you have what it takes to rise to the top?
                            </div>
                        </div>
                    </div>
                    <div className="splash-page__center-lower">
                        <FontAwesomeIcon 
                            icon={faChevronDown}
                            size="5x" />
                    </div>
                    <div className="splash-page__lower-gradient">

                    </div>
                </div>
                <div className="splash-page__bottom" id="splash-page__bottom">
                    <div className="splash-page__links">
                        <div className="splash__swipe swipe-red" />
                        <div className="splash__swipe swipe-yellow" />
                        <div className="splash__swipe swipe-blue" />
                        <div className="technologies__footer">
                            <div className="technologies__footer-title">
                                Technologies
                            </div>
                            <div className="technologies__footer-list">
                                <div className="technologies__footer-item">
                                    <div className="footer-item-image">
                                        <img src={require("../../assets/images/mongo.png")} alt="" />
                                    </div>
                                    <div className="footer-item-text">
                                        MongoDB
                                    </div>
                                </div>
                                <div className="technologies__footer-item">
                                    <div className="footer-item-image">
                                        <img src={require("../../assets/images/express.png")} alt="" />
                                    </div>
                                    <div className="footer-item-text">
                                        Express
                                    </div>
                                </div>
                                <div className="technologies__footer-item">
                                    <div className="footer-item-image">
                                        <img src={require("../../assets/images/react.png")} alt="" />
                                    </div>
                                    <div className="footer-item-text">
                                        React
                                    </div>
                                </div>
                                <div className="technologies__footer-item">
                                    <div className="footer-item-image">
                                        <img src={require("../../assets/images/redux.png")} alt="" />
                                    </div>
                                    <div className="footer-item-text">
                                        Redux
                                    </div>
                                </div>
                                <div className="technologies__footer-item">
                                    <div className="footer-item-image">
                                        <img src={require("../../assets/images/node.png")} alt="" />
                                    </div>
                                    <div className="footer-item-text">
                                        Node
                                    </div>
                                </div>
                                <div className="technologies__footer-item">
                                    <div className="footer-item-image">
                                        <img src={require("../../assets/images/socket.png")} alt="" />
                                    </div>
                                    <div className="footer-item-text">
                                        Socket.io
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="splash-page__links-container">
                            <div className="splash-page__links-header">
                                What is Quizard?
                            </div>
                            <div className="splash-page__links-text">
                                Quizard is a full stack quiz game built in <span>4 days</span> by these fine folks:
                            </div>
                            <div className="splash-page__profile-list">
                                <div className="splash-page__profile">
                                    <div className="profile-name">Caleb Jones</div>
                                    <img src={caleb} alt=""/>
                                    <div className="profile__line" />
                                    <div className="profile__social-links">
                                        <a href="https://www.linkedin.com/in/caleb-jones-928521126/" target="_blank" rel="noreferrer">
                                            <FontAwesomeIcon icon={faLinkedin} />
                                        </a>
                                        <a href="https://github.com/calebjo" target="_blank" rel="noreferrer">
                                            <FontAwesomeIcon icon={faGithubAlt} />
                                        </a>
                                        <a href="https://angel.co/u/caleb-jones-15" target="_blank" rel="noreferrer">
                                            <FontAwesomeIcon icon={faAngellist} />
                                        </a>
                                    </div>
                                </div>
                                <div className="splash-page__profile">
                                <div className="profile-name">Virginia Knight</div>
                                    <img src={virginia} alt=""/>
                                    <div className="profile__line" />
                                    <div className="profile__social-links">
                                        <a href="https://www.linkedin.com/in/virginia-knight-2a75aaa6/" target="_blank" rel="noreferrer">
                                            <FontAwesomeIcon icon={faLinkedin} />
                                        </a>
                                        <a href="https://github.com/virgknight" target="_blank" rel="noreferrer">
                                            <FontAwesomeIcon icon={faGithubAlt} />
                                        </a>
                                        <a href="https://angel.co/u/virginia-knight-2" target="_blank" rel="noreferrer">
                                            <FontAwesomeIcon icon={faAngellist} />
                                        </a>
                                    </div>
                                </div>
                                <div className="splash-page__profile">
                                <div className="profile-name">Julio Tavarez</div>
                                    <img src={julio} alt=""/>
                                    <div className="profile__line" />
                                    <div className="profile__social-links">
                                        <a href="https://www.linkedin.com/in/julio-tavarez-2404a118b/" target="_blank" rel="noreferrer">
                                            <FontAwesomeIcon icon={faLinkedin} />
                                        </a>
                                        <a href="https://github.com/jdtavarez" target="_blank" rel="noreferrer">
                                            <FontAwesomeIcon icon={faGithubAlt} />
                                        </a>
                                        <a href="https://angel.co/u/julio-tavarez-1" target="_blank" rel="noreferrer">
                                            <FontAwesomeIcon icon={faAngellist} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="splash-page__continue">
                            <div className="splash-page__continue-text">
                                Quizard's ingredients
                            </div>
                            <FontAwesomeIcon 
                                icon={faChevronDown} 
                                size="2x" />
                        </div> */}
                    </div>
                    {/* <div className="splash-page__technologies">
                    </div> */}
                </div>
            </div>
        )
    }   
}

export default SplashPage;