import React from "react";
import ReactDOM from "react-dom";
// import { signup, login, logout } from "./util/session_api_util";
import { signup, login, logout, logoutCurrentUser } from "./actions/session_actions";
import configureStore from "./store/store";
import Root from "./components/root";

document.addEventListener("DOMContentLoaded", () => {
	let store;
	if (window.currentUser) {
		const preloadedState = {
			entities: {
				users: { [window.currentUser.id]: window.currentUser },
			},
			session: { id: window.currentUser.id },
		};
		store = configureStore(preloadedState);
		delete window.currentUser;
	} else {
		store = configureStore();
	}

	window.signup = signup;
	window.login = login;
	window.logout = logoutCurrentUser;

	window.getState = store.getState;
	window.dispatch = store.dispatch;

	const root = document.getElementById("root");
	ReactDOM.render(<Root store={store} />, root);
});
