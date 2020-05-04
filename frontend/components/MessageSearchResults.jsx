import React, { Component } from "react";
import { InlineIcon } from "@iconify/react";
import searchIcon from "@iconify/icons-fe/search";
import outlineClose from "@iconify/icons-ic/outline-close";
import { closeModal } from "../actions/ui_actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SingleMessage from "../components/SingleMessage";
import { formatTimestamp } from "../util/misc_util";
import { displayName } from "../util/misc_util";

function mapStateToProps(state, ownProps) {
	return {
		messages: Object.values(state.entities.messages),
		users: state.entities.users
	};
}

function mapDispatchToProps(dispatch) {
	return {
		closeModal: () => dispatch(closeModal()),
	};
}

class MessageSearchResults extends Component {
	render() {
		let messages = null;
		if (this.props.messages) {
			let chID = this.props.match.params.id;
			// Object.values(state.entities.messages),
			messages = this.props.messages
				.filter((message) => message.channel_id == chID) //don't change to === different types
				.map((message) => {
					return (
						<SingleMessage
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
			<div className="message-search-results">
				<div className="message-search-input-section">
					<div className="message-search-input-icon">
						<InlineIcon icon={searchIcon} />
					</div>
					<input
						className="message-search-results-input"
						type="text"
						placeholder="Search"
					/>
					<div
						className="message-search-results-close"
						onClick={() => this.props.closeModal()}
					>
						<InlineIcon icon={outlineClose} />
					</div>
				</div>
				<div className="messages-search-results-messages">
					{messages}
				</div>
			</div>
		);
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(MessageSearchResults)
);
