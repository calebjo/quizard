import { connect } from "react-redux";
import SessionForm from "./session_form";
import { Link } from "react-router-dom";

import { signup, clearErrors } from "../../actions/session_actions"

// add errors from state
const mSTP = state => ({
    formType: "signup",
    headerText: "Join the Order",
    buttonText: "Enroll",
    altLink: (<Link to="/login">Already have an account? <span className="red underline">Log in!</span></Link>)
});

// add clear form errors action
// add sign up user action (saved under processForm)
const mDTP = dispatch => ({
    signup: user => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mSTP, mDTP)(SessionForm);