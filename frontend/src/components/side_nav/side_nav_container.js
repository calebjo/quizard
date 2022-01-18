import { connect } from "react-redux";
import SideNav from "./side_nav";

const mSTP = (state) => ({
    currentUser: state.session.user
});

// logout
const mDTP = dispatch => ({

});

export default connect(mSTP, mDTP)(SideNav);