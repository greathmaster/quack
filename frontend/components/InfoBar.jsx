import React, { Component } from "react";

export default class InfoBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
			return (
				<div className="info-bar">
					{this.props.header}
					{this.props.main}
				</div>
			);
		
	}
}
