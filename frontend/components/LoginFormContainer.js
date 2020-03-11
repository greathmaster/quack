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
		processForm: user => dispatch(login(user)),
	};
}

export default connect(mSTP, mDTP)(SessionForm);
