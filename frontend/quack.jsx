import React from "react";
import ReactDOM from "react-dom";
import {
	signup,
	login,
	logout,
	logoutCurrentUser,
} from "./actions/session_actions";
import configureStore from "./store/store";
import Root from "./components/root";
import { receiveSingleMessage } from "./actions/messagesActions";
import actionCable from 'actioncable'
import {findUsers} from './util/search_api_util'



const CableApp = {}

CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')

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
		store = configureStore();
	}

	window.signup = signup;
	window.login = login;
	window.logout = logoutCurrentUser;
	window.logout2 = logout;

	window.getState = store.getState;
	window.dispatch = store.dispatch;

	window.receiveSingleMessage = receiveSingleMessage;

	window.findUsers = findUsers;

	const root = document.getElementById("root");
	ReactDOM.render(<Root store={store} cableApp={CableApp} />, root);
});
