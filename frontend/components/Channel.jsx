import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import Chatbar from "../components/Chatbar";
import SingleMessage from "../components/SingleMessage";
import { connect } from "react-redux";
import { fetchAllChannelMessages } from "../actions/channels_actions";

function mapStateToProps(state, ownProps) {
	return {
		users: state.entities.users,
		channels: state.entities.channels,
		messages: Object.values(state.entities.messages),
		currentUser: state.entities.users[state.session.id],
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchAllChannelMessages: channelId =>
			dispatch(fetchAllChannelMessages(channelId)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class Channel extends Component {
		constructor(props) {
			super(props);
		}
		componentDidMount() {}

		render() {
			let messages = null;
			if (this.props.messages) {
				messages = this.props.messages.map(message => {
					return (
						<SingleMessage
							message={message.content}
							username={
								this.props.users[message.sender_id]
									? this.props.users[message.sender_id]
											.username
									: null
							}
							timestamp={message.dateCreated}
						/>
					);
				});
			}
			return (
				<div className="channelContainer">
					<div className="sidebar">
						<Sidebar />
					</div>
					<div className="chatContainer">
						<div className="searchBar"></div>
						<div className="mainChat">
							{messages ? messages.reverse() : null}
						</div>
						<div className="chatBar">
							<Chatbar />
						</div>
					</div>
				</div>
			);
		}
	}
);
