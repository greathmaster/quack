import * as SessionAPIUtil from "../util/session_api_util";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS"

export const receiveCurrentUser = currentUser => {
	return {
		type: RECEIVE_CURRENT_USER,
		currentUser,
	};
};

export const receiveOtherUsers = otherUsers => {
	return {
		type: RECEIVE_ALL_USERS,
		otherUsers
	}
}

export const logoutCurrentUser = () => {
	return {
		type: LOGOUT_CURRENT_USER,
	};
};

export const receiveErrors = errors => ({
	type: RECEIVE_SESSION_ERRORS,
	errors,
});

export const login = user => dispatch => {
	return SessionAPIUtil.login(user).then(
		user => {
			dispatch(receiveCurrentUser(user));
		},
		e => dispatch(receiveErrors(e.responseJSON))
	);
};

export const logout = () => dispatch => {
	return SessionAPIUtil.logout().then(
		
		() => dispatch(logoutCurrentUser()),
		e => dispatch(receiveErrors(e.responseJSON))
	);
};

export const signup = user => dispatch => {
	return SessionAPIUtil.signup(user).then(
		user => dispatch(receiveCurrentUser(user)),
		e => dispatch(receiveErrors(e.responseJSON))
	);
};
