import React from 'react'

import QuestionSetItem from './question_set_item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class QuestionSetIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchString: '',
            category: null
        }

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
                    {/* For all question sets, show an item  */}
                    <QuestionSetItem />
                    <QuestionSetItem />
                    <QuestionSetItem />
                </div>
            </div>
        )
    }
}

export default QuestionSetIndex;