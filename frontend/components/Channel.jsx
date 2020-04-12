import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "../components/Sidebar";
import Chatbar from "../components/Chatbar";
import SingleMessage from "../components/SingleMessage";
import {
	fetchAllChannelMessages,
	fetchAllChannels,
} from "../actions/channels_actions";
import SearchBar from "../components/SearchBar";
import { formatTimestamp } from "../util/misc_util";

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
		fetchAllChannels: userID => dispatch(fetchAllChannels(userID)),
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

		componentDidMount() {
			console.log(this.props)
			if (this.props.currentUser) {
				this.props.fetchAllChannelMessages(this.props.match.params.id);
				this.props.fetchAllChannels(this.props.currentUser.id);
			}
		}

		componentDidUpdate(prevProps) {
			// if (
			// 	Object.entries(this.props.channels).length !== 0 &&
			// 	!this.props.channels[this.props.match.params.id] &&
			// 	prevProps.match.params.id != this.props.match.params.id
			// ) {

			// 	this.props.history.goBack();
			// }
			// debugger
			// console.log("HELlo!")
			console.log("Hello")
			if (
				prevProps &&
				prevProps.match.params.id !== this.props.match.params.id
			) {
				this.props.fetchAllChannels(this.props.currentUser.id);
				this.props.fetchAllChannelMessages(this.props.match.params.id);
			}
		}

		renderSearchBar() {
			if (Object.values(this.props.channels).length !== 0) {
				const channelId = this.props.match.params.id;
				return (
					<SearchBar
						channel={this.props.channels[channelId]}
						numMembers={Object.values(this.props.users).length}
					/>
				);
			}

			return null;
		}

		render() {
			let messages = null;
			if (this.props.messages) {
				// debugger;

				let chID = this.props.match.params.id;
				messages = this.props.messages
					.filter(message => message.channel_id == chID) //don't change to === different types
					.map(message => {
						return (
							<SingleMessage
								key={message.id}
								message={message.content}
								username={
									this.props.users[message.sender_id]
										? this.props.users[message.sender_id]
												.username
										: null
								}
								avatar={message.avatar}
								timestamp={formatTimestamp(message.created_at)}
							/>
						);
					});
			}
			return (
				<>
					<div className="bar"> </div>
				<div className="channelContainer">
					<div className="sidebar">
						<Sidebar />
					</div>
					<div className="chatContainer">
						{this.renderSearchBar()}
						<div className="mainChat">
							{messages ? messages.reverse() : null}
						</div>
						<div className="chatBar">
							<Chatbar />
						</div>
					</div>
				</div>
				</>
			);
		}
	}
);
