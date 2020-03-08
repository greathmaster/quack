import React from "react";
import ReactDOM from "react-dom";
// import { signup, login, logout } from "./util/session_api_util";
import {
	signup,
	login,
	logout,
	logoutCurrentUser,
} from "./actions/session_actions";
import configureStore from "./store/store";
import Root from "./components/root";
import { receiveSingleMessage } from "./actions/messagesActions";

document.addEventListener("DOMContentLoaded", () => {
	let store;
	if (window.currentUser) {
		
		const preloadedState = {
			entities: {
				users: {
					[window.currentUser.id]: window.currentUser,
				},
			},
			session: { id: window.currentUser.id },
		};
		store = configureStore(preloadedState);
		delete window.currentUser;
	} else {
		const preLoadedState = {
			entities: {
				users: {
					11: {
						id: 11,
						username: "daffy",
					},
					25: {
						id: 25,
						username: "donald",
					},
				},
				messages: {
					65: {
						id: 65,
						content: "Quacks don't echo!",
						channelId: 4,
						ownerId: 11,
					},
				},
			},
		};
		store = configureStore();
	}

	window.signup = signup;
	window.login = login;
	window.logout = logoutCurrentUser;
	window.logout2 = logout;

	window.getState = store.getState;
	window.dispatch = store.dispatch;

	window.receiveSingleMessage = receiveSingleMessage;

	const root = document.getElementById("root");
	ReactDOM.render(<Root store={store} />, root);
});
