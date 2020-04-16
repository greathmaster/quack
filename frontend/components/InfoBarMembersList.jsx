import React, { Component } from "react";
import { connect } from "react-redux";
import userImage from "../../app/assets/images/user.jpg";
import { withRouter } from "react-router-dom";

function mapStateToProps(state, ownProps) {
	let users = [];
	for (let key in state.entities.users) {
		users.push(state.entities.users[key]);
	}
	return {
		users: users,
		channelId: ownProps.match.params.id,
		channelInfo: state.entities.channels[ownProps.match.params.id],
	};
}

export default withRouter(
	connect(mapStateToProps)(
		class InfoBarMembersList extends Component {
			constructor(props) {
				super(props);
			}

			renderSingleUser(user) {
				return (
					<div className="singleMessage">
						<div className="avatarContainer">
							<img className="avatar" src={userImage} />
						</div>
						<div className="messageContainer">
							<div className="senderNameInfo">
								<span className="username">
									{user.username}
								</span>
							</div>
						</div>
					</div>
				);
			}

			render() {
				if (this.props.users.length !== 0) {
					return (
						<div>
							<div className="info-bar-members-list-container">
								{this.props.users.map((user) => {
									return this.renderSingleUser(user);
								})}
							</div>
						</div>
					);
				} else {
					return null;
				}
			}
		}
	)
);
