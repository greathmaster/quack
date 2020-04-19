import React, { Component } from "react";
import { logout } from "../actions/session_actions";
import { InlineIcon } from "@iconify/react";
import logoutIcon from "@iconify/icons-websymbol/logout";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
	return {
		logout: () => dispatch(logout()),
	};
}

class Logout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div onClick={this.props.logout} className="sidebar-info-logout">
				<InlineIcon icon={logoutIcon} />
			</div>
		);
	}
}

export default connect(null, mapDispatchToProps)(Logout);
