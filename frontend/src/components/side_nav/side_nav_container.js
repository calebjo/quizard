import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import SideNav from "./side_nav";

const mSTP = (state) => ({
    currentUser: state.session.user
});

const mDTP = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(SideNav);