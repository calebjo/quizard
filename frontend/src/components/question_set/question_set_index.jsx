import React from 'react'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import './question_set_index.scss'

import QuestionSetItem from './question_set_item';
import SideNavContainer from '../side_nav/side_nav_container'

class QuestionSetIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchString: "",
            filtered: false,
            shownQuestionSets: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.filter = this.filter.bind(this);
    }

    componentDidMount() {
        this.props.fetchAllQuestionSets()
            .then(() => this.setState({shownQuestionSets: this.props.state.entities.questionSets}));
    }

    handleSubmit(e) {
        e.preventDefault();
        const allSets = this.state.filtered ? this.state.shownQuestionSets : this.props.state.entities.questionSets;
        // default option - show all
        if (!this.state.searchString) {
            this.setState({shownQuestionSets: allSets});
        // if category selected - filter for only that category
        } else {
            const selectedSets = allSets.filter((set) => 
                set.title.toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1);
            this.setState({shownQuestionSets: selectedSets});
        }
    }

    filter (e) {
        const selectedCat = e.currentTarget.value;
        const allSets = this.state.searchString ? this.state.shownQuestionSets : this.props.state.entities.questionSets;
        // default option - show all
        if (selectedCat === "0") {
            this.setState({shownQuestionSets: allSets, filtered: false});
        // if category selected - filter for only that category
        } else {
            const selectedSets = allSets.filter((set) => set.category === selectedCat);
            this.setState({shownQuestionSets: selectedSets, filtered: true});
        }
    }

    render(){
        const indexItems = this.state.shownQuestionSets.length ? (
            this.state.shownQuestionSets.map((questionSet, idx) => {
                return (
                    <QuestionSetItem 
                        questionSet={questionSet}
                        fetchSetQuestions={this.props.fetchSetQuestions}
                        createLobby={this.props.createLobby}
                        history={this.props.history}
                        currentUser={this.props.state.session.user}
                        key={idx}/>
                )
            })
        ) : (
            null
        )

        // Added by VK
         const categories = ["Art and Literature", "Film and TV", "Food and Drink", "General Knowledge", "Geography", "History", "Mixed", "Movies", "Music", "Science", "Society and Culture", "Sport and Leisure"];

        return(
            // SKELETON -- needs categories to choose from, as well as question set seeds to map
            <div className="question-set-index">
                <SideNavContainer />
                <div className="question-set-index__top-nav">
                    <div className="question-set-index__filters">
                        <div className="question-set-index__categories">
                            <select onChange={this.filter}>
                                <option value="0">Choose a Category &or;</option>
                                {/* Added by VK */}
                                {categories.map((cat, i) => (
                                    <option key={`opt${i}`} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="question-set-index__search">
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    value={this.state.searchString}
                                    onChange={(e) => this.setState({searchString: e.currentTarget.value})}
                                    type="text"
                                    placeholder="Find a question set"
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

export default withRouter(QuestionSetIndex);