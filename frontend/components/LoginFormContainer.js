import SessionForm from "./SessionForm";
import { connect } from "react-redux";
import { login, clearSessionErrors } from "../actions/session_actions";


function mSTP(state, ownProps) {

	return {
		errors: state.errors.session,
		formType: "login",
	};
}

function mDTP(dispatch) {
	return {
		processForm: (user, redirect) => dispatch(login(user, redirect)),
		clearSessionErrors: () => dispatch(clearSessionErrors())
	};
}

export default connect(mSTP, mDTP)(SessionForm);
