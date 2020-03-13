import SessionForm from "./SessionForm";
import { connect } from "react-redux";
import { login } from "../actions/session_actions";

function mSTP(state, ownProps) {

	return {
		errors: state.errors.session,
		formType: "login",
	};
}

function mDTP(dispatch) {
	return {
		processForm: (user, redirect) => dispatch(login(user, redirect)),
	};
}

export default connect(mSTP, mDTP)(SessionForm);
