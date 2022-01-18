import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import './question_set_index.scss'

import QuestionSetItem from './question_set_item';
import SideNavContainer from '../side_nav/side_nav_container'

class QuestionSetIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchString: '',
            category: null
        }
        // SKELETON -- hard coded temporary data
        this.user = {
            email: "test@gmail.com", 
            username: "test_user",
            sets_created: [],
            games_played: 0,
            games_won: 0
        };
        this.questionSets = [
            {
                category: "History",
                title: "U.S. History from 1800-1900",
                description: "A quiz of some of the most important historical events to happen between the 19-20th century in the United States."
            },
            {
                category: "Geography",
                title: "Very Good Cool Quiz",
                description: "Really cool quiz made by really cool guy"
            },
            {
                category: "Science",
                title: "ASOIUNDBUIOOUASDDANSD",
                description: "OA:INSBIOUljb3iyu1v23BASOIUDBOIASNDOPIASD1231231lkjn123OASIUNDOIASNDASNDASPOMD{ODaDSAasdasdas123sdfsdf234243"
            }
        ]
        this.question = {
            category: "Geography",
            question: "Which Eastern European capital is the 24th largest city in the world by population?",
            correctAnswer: "Moscow",
            incorrectAnswers: ["Kiev", "London", "Minsk"],
            type: "Multiple Choice"
        }
        this.questions = [
            this.question, this.question, this.question, this.question
        ]

        this.handleSubmit = this.handleSubmit.bind(this)
        this.update = this.update.bind(this)
    }

    componentDidMount() {
        this.props.fetchQuestionSet(1);
        console.log(this.props)
    }

    handleSubmit(e) {
        e.preventDefault()
        // USE THE SEARCH STRING TO FIND MATCHING QUESTION SETS
    }

    update(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value })
        }
    }

    render(){
        return(
            // SKELETON -- needs categories to choose from, as well as question set seeds to map
            <div className="question-set-index">
                <SideNavContainer />
                <div className="question-set-index__top-nav">
                    <div className="question-set-index__filters">
                        <div className="question-set-index__categories">
                            <select onChange={() => this.update('category')}>
                                <option value="0">INSERT CATEGORY HERE</option>
                                <option value="1">INSERT CATEGORY HERE</option>
                            </select>
                        </div>
                        <div className="question-set-index__search">
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    type="text"
                                    value={this.state.searchString}
                                    placeholder="Find a question set"
                                    onChange={() => this.update('searchString')}
                                />
                                <button type="submit">
                                    <FontAwesomeIcon 
                                        icon={ faSearch }
                                    />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="question-set-index__items">
                    {/* SKELETON -- For all question sets, show an item  */}
                    {/* SKELETON -- For each set, find and pass down its questions */}
                    <QuestionSetItem 
                        questionSet={this.questionSets[0]}
                        questions={this.questions}/>
                    <QuestionSetItem 
                        questionSet={this.questionSets[1]}
                        questions={this.questions}/>
                    <QuestionSetItem 
                        questionSet={this.questionSets[2]}
                        questions={this.questions}/>
                </div>
            </div>
        )
    }
}

export default QuestionSetIndex;