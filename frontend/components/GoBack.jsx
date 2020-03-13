import React, { Component } from "react";
import {withRouter} from "react-router-dom"

export default withRouter(
	class GoBack extends Component {
		componentDidMount() {
			this.props.history.goBack();
		}
		render() {
			return <></>;
		}
	}
);
