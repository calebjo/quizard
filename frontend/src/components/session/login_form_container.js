import { connect } from "react-redux";
import SessionForm from "./session_form";
import { Link } from "react-router-dom";

import { login, clearErrors } from "../../actions/session_actions"

const mSTP = state => ({
    currentUser: state.session.user,
    formType: "login",
    headerText: "Log in to Quizard",
    buttonText: "Let's go!",
    altLink: (<Link to="/signup">No account yet? <span className="orange underline">Sign up!</span></Link>),
    errors: state.errors.session
});

const mDTP = dispatch => ({
    login: user => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mSTP, mDTP)(SessionForm);