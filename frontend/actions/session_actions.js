import * as SessionAPIUtil from "../util/session_api_util";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS"

export const receiveCurrentUser = currentUser => {
	return {
		type: RECEIVE_CURRENT_USER,
		currentUser,
	};
};

export const receiveOtherUsers = otherUsers => {
	return {
		type: RECEIVE_ALL_USERS,
		otherUsers,
	};
};

export const clearSessionErrors = () => {
	return {
		type: CLEAR_SESSION_ERRORS
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

export const login = (user, redirect) => dispatch => {
	return SessionAPIUtil.login(user).then(
		user => {
			dispatch(receiveCurrentUser(user));
			dispatch(() => redirect(user.default_channel_id));
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

export const signup = (user, redirect) => dispatch => {
	return SessionAPIUtil.signup(user).then(
		user => {
			dispatch(receiveCurrentUser(user));
			dispatch(() => redirect(user.default_channel_id));
		},
		e => dispatch(receiveErrors(e.responseJSON))
	);
};
