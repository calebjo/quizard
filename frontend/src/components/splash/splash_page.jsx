import React from 'react'
import './splash_page.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

// SKELETON -- To be replaced with TopNavContainer for login/signup
import TopNav from '../top_nav/top_nav'

class SplashPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quote: "Oh no, we've got an ugly one this time...",
            screenWidth: null,
            joinButtonText: "Join",
            createButtonText: "Create",
        }
    }

    componentDidMount() {
        // set random quote text on reload
        this.randomQuoteText()

        // change button text on small/large screens
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    
    resize() {
        this.setState({
            screenWidth: window.innerWidth
        })
        // if screen is over the breakpoint, make the buttons have more text
        if ( this.state.screenWidth >= 770) {
            this.setState({
                joinButtonText: "Join Game",
                createButtonText: "Create Quiz"
            })
        } else {
            this.setState({
                joinButtonText: "Join",
                createButtonText: "Create"
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
            "Aren't you the one that that lost TERRIBLY last time?",
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
                                    className="splash-page__center-button">
                                    { this.state.joinButtonText }
                                </button>
                                <button
                                    className="splash-page__center-button">
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
                </div>
                <div className="splash-page__bottom">
                    <div className="splash-page__links">
                    
                    </div>
                    <div className="splash-page__technologies">
                        
                    </div>
                </div>
            </div>
        )
    }   
}

export default SplashPage;