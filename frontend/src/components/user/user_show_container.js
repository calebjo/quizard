import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import UserShow from "./user_show";

const mSTP = (state, ownProps) => ({
    currentUser: state.session.user,
    viewedUser: state.entities.users[ownProps.match.params.id],
});

// VK: add fetch quiz sets action when CJ is done
const mDTP = dispatch => ({
    fetchUser: (userId) => dispatch(fetchUser(userId))
});

export default connect(mSTP, mDTP)(UserShow);