import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "../components/Sidebar";
// import Chatbar from "../components/Chatbar";
import SingleMessage from "../components/SingleMessage";
import InfoBar from "../components/InfoBar";
import InfoBarHeader from "./InfoBarHeader";
import InfoBarMembersList from "./InfoBarMembersList";
import RichChatbar from "../components/RichChatbar";

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
		fetchAllChannelMessages: (channelId) =>
			dispatch(fetchAllChannelMessages(channelId)),
		fetchAllChannels: (userID) => dispatch(fetchAllChannels(userID)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class Channel extends Component {
		constructor(props) {
			super(props);
			this.state = { showInfoBar: true, showEditProfile: false };
			this.closeInfoBar = this.closeInfoBar.bind(this);
			this.openInfoBar = this.openInfoBar.bind(this);
			this.closeEditProfile = this.closeEditProfile.bind(this);
			this.openEditProfile = this.openEditProfile.bind(this);
		}

		componentDidMount() {
			if (this.props.currentUser) {
				this.props.fetchAllChannelMessages(this.props.match.params.id);
				this.props.fetchAllChannels(this.props.currentUser.id);
			}
		}

		componentDidUpdate(prevProps) {
			if (
				prevProps &&
				prevProps.match.params.id !== this.props.match.params.id
			) {
				//consider removing the line below...
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
						openInfoBar={this.openInfoBar}
					/>
				);
			}

			return null;
		}

		closeInfoBar() {
			this.setState({ showInfoBar: false });
		}

		openInfoBar() {
			this.setState({ showInfoBar: true });
		}

		closeEditProfile() {
			this.setState({ showEditProfile: false });
		}
		openEditProfile() {
			this.setState({ showEditProfile: true });
		}

		render() {
			let messages = null;
			if (this.props.messages) {
				// debugger;

				let chID = this.props.match.params.id;
				messages = this.props.messages
					.filter((message) => message.channel_id == chID) //don't change to === different types
					.map((message) => {
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
								avatar={
									this.props.users[message.sender_id]
										? this.props.users[message.sender_id]
												.avatar
										: null
								}

								timestamp={formatTimestamp(message.created_at)}
							/>
						);
					});
			}

			let channelNameRightSidebar = "";
			if (Object.values(this.props.channels).length !== 0) {
				let currentChannel = this.props.channels[
					this.props.match.params.id
				];

				if (!currentChannel.private) {
					channelNameRightSidebar = `#${currentChannel.name}`;
				} else {
					channelNameRightSidebar = currentChannel.name;
				}
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
								<RichChatbar />
							</div>
						</div>

						{this.state.showInfoBar ? (
							<InfoBar
								header={
									<InfoBarHeader
										firstLine={"Members"}
										secondLine={channelNameRightSidebar}
										closeInfoBar={this.closeInfoBar}
									/>
								}
								main={<InfoBarMembersList />}
							/>
						) : null}
					</div>
				</>
			);
		}
	}
);
