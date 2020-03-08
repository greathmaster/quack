import React, { Component } from "react";
import { logout } from "../actions/session_actions";
export default class Logout extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		dispatch(logout());
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<button>Logout</button>
			</form>
		);
	}
}
