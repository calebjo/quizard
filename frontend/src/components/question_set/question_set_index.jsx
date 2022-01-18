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
        this.props.fetchAllQuestionSets();
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
        const indexItems = this.props.state.entities.questionSets.length ? (
            this.props.state.entities.questionSets.map((questionSet, idx) => {
                return (
                    <QuestionSetItem 
                        questionSet={questionSet}
                        fetchSetQuestions={this.props.fetchSetQuestions}
                        key={idx}/>
                )
            })
        ) : (
            null
        )

        return(
            // SKELETON -- needs categories to choose from, as well as question set seeds to map
            <div className="question-set-index">
                <SideNavContainer />
                <div className="question-set-index__top-nav">
                    <div className="question-set-index__filters">
                        <div className="question-set-index__categories">
                            <select onChange={() => this.update('category')}>
                                <option disabled value="0">Choose a Category</option>
                                <option value="1">INSERT CATEGORY HERE</option>
                                <option value="1">INSERT CATEGORY HERE</option>
                                <option value="1">INSERT CATEGORY HERE</option>
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
                    { indexItems }
                </div>
            </div>
        )
    }
}

export default QuestionSetIndex;