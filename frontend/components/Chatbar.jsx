import React, { Component } from "react";
import { createNewMessage } from "../actions/messagesActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function mapStateToProps(state, ownProps) {
	// debugger;
	return {
		currentUser: state.entities.users[state.session.id],
		channelId: ownProps.match.params.id,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		createNewMessage: message => dispatch(createNewMessage(message)),
	};
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(
		class Chatbar extends Component {
			constructor(props) {
				super(props);

				// this.currentUser = null;

				this.state = { message: "" }; //bonus pull from local storage if not sent?
				this.handleMessage = this.handleMessage.bind(this);
				this.handleKeyPressed = this.handleKeyPressed.bind(this);
				this.handleSubmit = this.handleSubmit.bind(this);
				this.submitMessage = this.submitMessage.bind(this);
			}

			// componentDidMount() {
			// 	// this.currentUser = this.props.currentUser;
			// }

			handleMessage(e) {
				return this.setState({ message: e.target.value });
			}

			handleKeyPressed(e) {
				if (
					e.key === "Enter" &&
					this.state.message.trim().length !== 0
				) {
					this.submitMessage();
				}
			}

			handleSubmit(e) {
				e.preventDefault();
				this.submitMessage();
			}

			submitMessage() {
				let now = new Date();

				let message = {
					content: this.state.message,
					sender_id: this.props.currentUser.id,
					channel_id: this.props.channelId,
				};
				this.setState({ message: "" });
				this.props.createNewMessage(message);
			}

			render() {
				return (
					<>
						<form onSubmit={this.handleSubmit}>
							<div className="formFieldContainer">
								<textarea
									className="chatArea"
									placeholder="Send a message"
									onChange={this.handleMessage}
									onKeyDown={this.handleKeyPressed}
									value={this.state.message}
								/>
								<button>Submit</button>
							</div>
						</form>
					</>
				);
			}
		}
	)
);
