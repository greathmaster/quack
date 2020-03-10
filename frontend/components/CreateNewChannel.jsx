import React, { Component } from "react";
import { withRouter } from "react-router-dom";

export default withRouter(
	class CreateNewChannel extends Component {
		constructor(props) {
			super(props);
			this.handleClick = this.handleClick.bind(this);
		}

		handleClick() {
			this.props.history.push('/search')
		}

		render() {
			return (
				<div>
					<div
						className="createNewChannelContainer"
						onClick={this.handleClick}
					>
						<div className="createChannelIcon">+</div>
						<div className="createNewChannelTitle">
							Add a Channel
						</div>
					</div>
				</div>
			);
		}
	}
);
