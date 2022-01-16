import React from 'react'
import './splash_page.scss'

// SKELETON -- To be replaced with TopNavContainer for login/signup
import TopNav from '../top_nav/top_nav'

class SplashPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quote: "Oh no, we've got an ugly one this time..."
        }
    }

    componentDidMount() {
        this.randomQuoteText()
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
                                <div className="splash-page__quote-box" />
                                <div className="splash-page__quote-text">
                                    { this.state.quote }
                                </div>
                            </div>
                            <div className="splash-page__wizard-sprite">
                                🧙
                            </div>
                        </div>
                        
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