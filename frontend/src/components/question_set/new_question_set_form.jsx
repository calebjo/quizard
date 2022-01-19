import React from "react";
import "./new_question_set_form.scss";

class NewQuestionSetForm extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            creator_id: this.props.currentUser.id,
            category: "",
            title: "",
            description: ""
        }
        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        this.props.clearQsetErrors();
    }

    update(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createQuestionSet(this.state)
            .then(() => {
                if (Object.values(this.props.errors).length === 0) {
                    this.props.history.push(`/question-sets`)
                }
            })
    }

    render () {
        const {title, description} = this.state;
        const {errors} = this.props;

        const categories = ["Art and Literature", "Film and TV", "Food and Drink", "General Knowledge", "Geography", "History", "Mixed", "Movies", "Music", "Science", "Society and Culture", "Sport and Leisure"];

        // Error messages
        let errorMsg;
        if (Object.values(errors).length > 0) {
            errorMsg = Object.values(errors).map((error, i) => (
                <p key={`err${i}`} className="errortxt">{error}</p>
            ))
        }

        return (
            <div className="with-nav new-qset-form-bg">
                <div className="new-qset-form edit-user-form">
                    <h2>Forge a new Question Set!</h2>
                    {errorMsg}
                    <form>

                        <div className="edit-flex">
                            <label>Title</label>
                            <input type="text" value={title} onChange={this.update("title")} />
                        </div>

                        <div className="edit-flex">
                            <label>Category</label>
                            <select onChange={this.update('category')}>
                                <option selected disabled value="0">Select a Category...</option>
                                {categories.map((cat) => (
                                    <option value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="edit-flex">
                            <label>Description</label>
                            <textarea value={description} onChange={this.update("description")}
                                placeholder="Optional"/>
                        </div>

                        <div className="create-buttons">
                            <button className="styled-button red-bg" 
                                onClick={() => this.props.history.push("/question-sets")}>Cancel</button>
                            <button className="styled-button orange-bg" 
                                onClick={this.handleSubmit}>Create!</button>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

export default NewQuestionSetForm;