import React from 'react'

class QuestionSetItem extends React.Component {
    constructor(props) {
        super(props)
    }

    startGame() {
        // SKELETON -- change to start a game when built
        console.log(`Starting a game from a ${this.props.category} set!`)
    }

    render(){
        return(
            <div className="question-set-item">
                <div className="question-set-item__container">
                    <div className="question-set-item__title">
                        {this.props.questionSet.title}
                    </div>
                    <div className="question-set-item__details-container">
                        <div className="question-set-item__question-number">
                            {this.props.questions.length} questions
                        </div>
                        <div className="question-set-item__category">
                            {this.props.questionSet.category}
                        </div>
                        <button 
                            className="question-set-item__start"
                            onClick={this.startGame}>
                            Start a Game
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionSetItem;