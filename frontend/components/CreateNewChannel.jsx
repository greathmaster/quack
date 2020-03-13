import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Icon, InlineIcon } from "@iconify/react";
import addCircleOutline from "@iconify/icons-ion/add-circle-outline";

export default withRouter(
	class CreateNewChannel extends Component {
		constructor(props) {
			super(props);
			this.handleClick = this.handleClick.bind(this);
		}

		handleClick() {
			if (this.props.type == "private") {
				this.props.history.push("/search");
			}
			if (this.props.type == "public") {
				this.props.history.push("/createChannel");
			}
		}

		render() {
			return (
				<div>
					<div
						className="createNewChannelContainer"
						onClick={this.handleClick}
					>
						{this.props.type == "public" ? (
							<>
								<div style={{ marginRight: 5 + "px" }}>+</div>
								<div className="createNewChannelTitle">
									Add a Channel
								</div>
							</>
						) : (
							<>
								<div className="createDirectMessage">
									<div className="createChannelIcon">
										<div>Direct Message</div>
									</div>
										<div><Icon icon={addCircleOutline} /></div>
								</div>
							</>
						)}
					</div>
				</div>
			);
		}
	}
);
// npm install --save-dev @iconify/react @iconify/icons-ion
// import { Icon, InlineIcon } from '@iconify/react';
// import addCircleOutline from '@iconify/icons-ion/add-circle-outline';
