import SessionForm from "./SessionForm"
import { connect } from "react-redux"
import {signup, clearSessionErrors} from '../actions/session_actions'

function mSTP(state, ownProps) {
	return {
		errors: state.errors.session,
		formType: 'signup'
	}
}

function mDTP(dispatch) {
	return {
		processForm: (user, redirect) => dispatch(signup(user, redirect)),
		clearSessionErrors: () => dispatch(clearSessionErrors())

	}
}

export default connect(mSTP, mDTP)(SessionForm)