import { connect } from "react-redux";
import { clearUserErrors } from "../../actions/user_actions";
import EditUserForm from "./edit_user_form";

const mSTP = state => ({
    currentUser: state.session.user,
    errors: state.errors.user
});


// edit user action
// delete user action (and possibly logout action?)
const mDTP = dispatch => ({
    clearUserErrors: () => dispatch(clearUserErrors()),
});

export default connect(mSTP, mDTP)(EditUserForm);