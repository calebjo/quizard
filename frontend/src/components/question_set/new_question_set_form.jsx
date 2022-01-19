import React from "react";

class NewQuestionSetForm extends React.Component {

    componentWillUnmount() {
        this.props.clearQsetErrors();
    }

    render () {
        return (<p>New QSet form yay!!!</p>);
    }
}

export default NewQuestionSetForm;