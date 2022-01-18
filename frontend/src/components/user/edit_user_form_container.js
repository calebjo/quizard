import { connect } from "react-redux";
import { clearUserErrors, updateUser, deleteUser } from "../../actions/user_actions";
import EditUserForm from "./edit_user_form";

const mSTP = state => ({
    currentUser: state.session.user,
    errors: state.errors.user
});

const mDTP = dispatch => ({
    clearUserErrors: () => dispatch(clearUserErrors()),
    updateUser: (user) => dispatch(updateUser(user)),
    deleteUser: (userId) => dispatch(deleteUser(userId))
});

export default connect(mSTP, mDTP)(EditUserForm);