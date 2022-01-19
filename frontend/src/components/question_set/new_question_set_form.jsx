import React from "react";
import "./new_question_set_form.scss";

class NewQuestionSetForm extends React.Component {

    componentWillUnmount() {
        this.props.clearQsetErrors();
    }

    render () {
        return (
            <div className="with-nav new-qset-form-bg">
                <div className="new-qset-form">
                    <p>hi!!!</p>
                </div>
            </div>
        );
    }
}

export default NewQuestionSetForm;