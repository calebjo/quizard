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

    handleSubmit(e) {
        e.preventDefault()
        // USE THE SEARCH STRING TO FIND MATCHING QUESTION SETS
    }

    updateSearch(e) {
        this.setState({
            searchString: e.currentTarget.value
        })
    }

    updateCategory(e) {
        this.setState({
            category: e.currentTarget.value
        })
    }

    render(){
        return(
            <div className="question-set-index">
                <div className="question-set-index__top-nav">
                    <div className="question-set-index__filters">
                        <div className="question-set-index__categories">
                            <select onChange={this.updateCategory}>
                                <option value="0">Any</option>
                                <option value="1">1+</option>
                                <option value="2">2+</option>
                                <option value="3">3+</option>
                                <option value="4">4+</option>
                            </select>
                        </div>
                        <div className="question-set-index__search">
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    type="text"
                                    value={this.state.searchString}
                                    placeholder="Find a question set"
                                    onChange={this.updateSearch}
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