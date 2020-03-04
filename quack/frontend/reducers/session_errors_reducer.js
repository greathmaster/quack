import {RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER} from '../actions/session_actions'


export default function sessionErrorsReducer(prevState = [], action) {
	Object.freeze(prevState);
	let newState = Object.assign({}, prevState);
	switch (action.type) {
		case RECEIVE_SESSION_ERRORS:
			newState = action.errors;
			return newState;
		case RECEIVE_CURRENT_USER:
			newState = [];
			return newState;

		default:
			return prevState;
	}
}
