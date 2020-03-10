import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "../components/Sidebar";
import Chatbar from "../components/Chatbar";
import SingleMessage from "../components/SingleMessage";
import { fetchAllChannelMessages } from "../actions/channels_actions";
import SearchBar from "../components/SearchBar";
import ls from 'local-storage'


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
			this.establishWebSocketSubscription = this.establishWebSocketSubscription.bind(
				this
			);
			this.updateAppStateChannel = this.updateAppStateChannel.bind(this);
		}

		updateAppStateChannel(newChannel) {
			this.props.fetchAllChannelMessages(newChannel.room);
		}

		componentDidMount() {
			//look up the current channel from local storage
			//and then refetch everything?
			let lastChannelID = ls.get('lastChannelID')
 			if (lastChannelID) {
				this.props.fetchAllChannelMessages(lastChannelID)
			}

		
		}

		componentDidUpdate(prevProps) {
			// debugger
			if(prevProps.match.params.id != this.props.match.params.id) {
				this.props.fetchAllChannelMessages(this.props.match.params.id)
			}
		}

		establishWebSocketSubscription(channelId) {
			this.props.cableApp.channel = this.props.cableApp.cable.subscriptions.create(
				{
					channel: "ChannelsChannel",
					room: channelId,
				},
				{
					connected: () => {
						console.log(`Connected to ${channelId}`);
					},

					disconnected: () => {
						console.log(`Connected to ${channelId}`);
					},

					received: updatedChannel => {
						// this.updateAppStateChannel(updatedChannel);
						this.props.fetchAllChannelMessages(updatedChannel.room);

					},
				}
			);
		}

		renderSearchBar() {
			if (Object.values(this.props.channels).length !== 0) {
				const channelId = this.props.match.params.id;

				let channel = this.props.channels.find(channel => {
					return channel.id == channelId;
				});
				return (
					<SearchBar
						channel={channel}
						numMembers={Object.values(this.props.users).length}
					/>
				);
			}

			return null;
		}

		render() {
			// debugger
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
						<Sidebar
							establishWebSocketSubscription={
								this.establishWebSocketSubscription
							}
						/>
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
			);
		}
	}
);
