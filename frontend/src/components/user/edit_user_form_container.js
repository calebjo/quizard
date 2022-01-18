import { connect } from "react-redux";
import EditUserForm from "./edit_user_form";

// current user info
// errors
const mSTP = (state, ownProps) => ({

});


// clear errors action
// edit user action
// delete user action (and possibly logout action?)
const mDTP = dispatch => ({

});

export default connect(mSTP, mDTP)(EditUserForm);