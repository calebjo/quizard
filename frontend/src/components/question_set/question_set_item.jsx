import React from 'react'
// nanoid package for generating lobby id
import {nanoid} from 'nanoid';

import GameLobbyContainer from '../game/game_lobby_container'

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
        })
    }

    startGame() {
        // SKELETON -- start a game with a random url string
        console.log(`Starting a game from a ${this.props.questionSet.category} set!`)

        const lobbyId = nanoid(5)
        // return (
        //     <GameLobbyContainer
        //         questionSet={this.props.questionSet}
        //         questions={this.state.questions}
        //         lobbyId={"A9ME8B"}
        //     />
        // )
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