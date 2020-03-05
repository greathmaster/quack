import {
	RECEIVE_CURRENT_USER,
	LOGOUT_CURRENT_USER,
} from "../actions/session_actions";

const _nullUser = Object.freeze({
	id: null
  });

const sessionReducer = (previousState = _nullUser, action) => {
	Object.freeze(previousState);
	// let newState = Object.assign({}, previousState);

	switch (action.type) {
		case RECEIVE_CURRENT_USER:
			let newState = { id: action.currentUser.id };
			return newState;

		case LOGOUT_CURRENT_USER:
			return _nullUser;

		default:
			return previousState;
	}
};

export default sessionReducer;
