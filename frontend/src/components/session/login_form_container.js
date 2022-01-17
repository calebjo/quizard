import { connect } from "react-redux";
import SessionForm from "./session_form";
import { Link } from "react-router-dom";

// add errors from state
const mSTP = state => ({
    formType: "login",
    headerText: "Log in to Quizard",
    buttonText: "Let's go!",
    altLink: (<Link to="/signup">No account yet? <span className="orange">Sign up!</span></Link>)
});

// add clear form errors action
// add log in user action (saved under processForm)
const mDTP = dispatch => ({

});

export default connect(mSTP, mDTP)(SessionForm);