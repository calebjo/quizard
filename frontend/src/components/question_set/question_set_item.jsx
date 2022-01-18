import React from 'react'

class QuestionSetItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questions: []
        }
        this.startGame = this.startGame.bind(this)
    }

    componentDidMount() {
        this.props.fetchSetQuestions(this.props.questionSet._id).then((response) => {
            this.setState({
                questions: response.questions.data
            })
            console.log(this.state.questions)
        })
    }

    startGame() {
        // SKELETON -- change to start a game when built
        console.log(`Starting a game from a ${this.props.questionSet.category} set!`)
    }

    render(){
        // Pluralize question number text
        const questionNumText = this.state.questions.length > 1 || this.state.questions.length === 0 ? (
            this.state.questions.length.toString() + " questions"
        ) : (
            this.state.questions.length.toString() + " question"
        )
        return(
            <div className="question-set-item">
                <div className="question-set-item__container">
                    <div className="question-set-item__title">
                        {this.props.questionSet.title}
                    </div>
                    <div className="question-set-item__details-container">
                        <div className="question-set-item__question-number">
                            { questionNumText }
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