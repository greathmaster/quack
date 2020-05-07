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
		users: state.entities.users,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		closeModal: () => dispatch(closeModal()),
	};
}

class MessageSearchResults extends Component {
	constructor(props) {
		super(props);
		this.state = { messages: this.props.messages, searchStr: "" };
		this.handleInput = this.handleInput.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleInput(e) {
		this.setState({ searchStr: e.target.value });
	}

	matches() {
		const matches = [];

		this.state.messages.forEach((message) => {
			const sub = message.content
				.replace(/(<([^>]+)>)/gi, "") //Taken from: https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
				.replace( /[\r\n]+/gm, "" )		//Taken from: https://www.geeksforgeeks.org/how-to-remove-all-line-breaks-from-a-string-using-javascript/
				.slice(0, this.state.searchStr.length);
			if (sub.toLowerCase() == this.state.searchStr.toLowerCase()) {
				matches.push(message);
			}
		});

		return matches;
	}
//https://stackoverflow.com/questions/11039885/scrollintoview-causing-the-whole-page-to-move
	handleClick(id) {
		this.props.closeModal();
		let messageDiv = this.props.refs[id].current
		messageDiv.classList.add('highlight');
		setTimeout(() => {
			messageDiv.classList.remove('highlight');
		},2100)
		// messageDiv.scrollIntoView(false);
		messageDiv.scrollIntoView({block: 'end', inline: 'center' })
		// messageDiv.scrollIntoView({block: 'start' })
		

	}

	render() {
		let messages = null;
		if (this.state.messages) {
			messages = this.matches().map((message) => {
				return (
					<SingleMessage
						handleClick={() => this.handleClick(message.id)}
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
						value={this.state.searchStr}
						onChange={this.handleInput}
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
