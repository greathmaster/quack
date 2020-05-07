import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "../components/Sidebar";
import SingleMessage from "../components/SingleMessage";
import InfoBar from "../components/InfoBar";
import RichChatbar from "../components/RichChatbar";
import Modal from "../components/Modal";
import { displayName } from "../util/misc_util";
import MessageSearch from "../components/MessageSearch";

import {
	fetchAllChannelMessages,
	fetchAllChannels,
} from "../actions/channels_actions";
import { openInfoBar } from "../actions/ui_actions";
import SearchBar from "../components/SearchBar";
import { formatTimestamp } from "../util/misc_util";

function mapStateToProps(state, ownProps) {
	return {
		users: state.entities.users,
		channels: state.entities.channels,
		messages: Object.values(state.entities.messages),
		currentUser: state.entities.users[state.session.id],
		modal: state.ui.modal,
		infobar: state.ui.infobar,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchAllChannelMessages: (channelId) =>
			dispatch(fetchAllChannelMessages(channelId)),
		fetchAllChannels: (userID) => dispatch(fetchAllChannels(userID)),
		openInfoBar: (infobar) => dispatch(openInfoBar(infobar)),
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
			this.something = {};
		}

		componentDidMount() {
			// for (let i = 0; i < props.messages.length; i++) {
			// 	this.refs[props.messages[i].id] = React.createRef();
			// }
			this.props.openInfoBar({ type: "membersList" });

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
					/>
				);
			}

			return null;
		}

		render() {
			let messages = null;
			if (this.props.messages) {
				let chID = this.props.match.params.id;
				messages = this.props.messages.filter(
					(message) => message.channel_id == chID
				); //don't change to === different types
				
				messages.forEach((message) => {
					this.something[message.id] = React.createRef()
				})

				messages = messages.map((message) => {
					return (
						<SingleMessage
							ref2={this.something[message.id]}
							key={message.id}
							message={message.content}
							displayName={
								this.props.users[message.sender_id]
									? displayName(
											this.props.users[message.sender_id]
									  )
									: null
							}
							avatar={
								this.props.users[message.sender_id]
									? this.props.users[message.sender_id].avatar
									: null
							}
							timestamp={formatTimestamp(message.created_at)}
						/>
					);
				});
			}

			return (
				<>
					{!!this.props.modal ? <Modal /> : null}
					<div className="bar">
						<MessageSearch refs={this.something} />
					</div>
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

						{!!this.props.infobar ? <InfoBar /> : null}
					</div>
				</>
			);
		}
	}
);
