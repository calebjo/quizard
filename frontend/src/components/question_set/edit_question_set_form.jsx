import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

class EditQuestionSetForm extends React.Component {
    constructor(props) {
        super(props);

        const {questionSet} = this.props;
        this.state = {
            hidden: true,
            id: questionSet._id,
            title: questionSet.title,
            category: questionSet.category,
            description: questionSet.description
        }

        this.reveal = this.reveal.bind(this);
        this.hide = this.hide.bind(this);
        this.update = this.update.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.props.clearQsetErrors();
    }

    reveal (e) {
        e.preventDefault();
        this.setState({hidden: false});
        e.stopPropagation();
    }

    hide (e) {
        e.preventDefault();
        this.setState({hidden: true});
        this.props.clearQsetErrors();
        e.stopPropagation();
    }

    update(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        }
    }

    handleUpdate(e) {
        e.preventDefault();
        const newData = (({id, title, category, description}) => ({id, title, category, description}))(this.state);

        console.log(newData);

        this.props.updateQuestionSet(newData)
            .then(() => {
                if (Object.values(this.props.errors).length === 0) {
                    this.setState({hidden: true}); // close modal so user can continue editing indiv questions
                }
            })
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.deleteQuestionSet(this.state.id).then(() => this.props.history.push("/question-sets"));
    }

    render () {
        const {hidden, title, description, category} = this.state;
        const {errors} = this.props;
        const categories = ["Art and Literature", "Film and TV", "Food and Drink", "General Knowledge", "Geography", "History", "Mixed", "Movies", "Music", "Science", "Society and Culture", "Sport and Leisure"];

        // Error messages
        let errorMsg;
        if (Object.values(errors).length > 0) {
            errorMsg = Object.values(errors).map((error, i) => (
                <p key={`err${i}`} className="errortxt">{error}</p>
            ))
        }

        if (!this.props.questionSet) {
            return null;
        } else if (hidden) {
            return <span onClick={this.reveal}><FontAwesomeIcon icon={faEllipsisH} /></span>;
        } else {
            return (
            <>
                <span onClick={this.reveal}><FontAwesomeIcon icon={faEllipsisH} /></span>
                <div className="edit-modal" onClick={this.hide}>
                    <div className="edit-modal-content edit-user-form" onClick={e => e.stopPropagation()}>
                        <div onClick={this.hide} className="close-button">
                            <FontAwesomeIcon icon={faTimes} size="2x" />
                        </div>

                        {errorMsg}

                        <form>
                            <div className="edit-flex">
                                <label>Title</label>
                                <input type="text" value={title} onChange={this.update("title")} />
                            </div>

                            <div className="edit-flex">
                                <label>Category</label>
                                <select onChange={this.update('category')} value={category}>
                                    {categories.map((cat, i) => (
                                        <option key={`opt${i}`} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="edit-flex">
                                <label>Description</label>
                                <textarea value={description} onChange={this.update("description")}
                                    placeholder="Optional"/>
                            </div>

                            <div className="edit-buttons">
                                <button className="styled-button greyed" 
                                    onClick={this.handleDelete}>Delete Set</button>
                                <button className="styled-button orange-bg" 
                                    onClick={this.handleUpdate}>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
            )
        }
    }
}

export default EditQuestionSetForm;