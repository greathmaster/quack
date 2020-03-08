import React, { Component } from "react";
import { receiveSingleMessage } from "../actions/messagesActions";
import { connect } from "react-redux";

function mapStateToProps(state) {

	return {
		currentUser: state.entities.users[state.session.id]
	};
}

function mapDispatchToProps(dispatch) {
	return {
		submitMessage: (message) => (dispatch(receiveSingleMessage(message)))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(
	class Chatbar extends Component {
		constructor(props) {
			super(props);

			this.currentUser = null;

			this.state = { message: "" }; //bonus pull from local storage if not sent?
			this.handleMessage = this.handleMessage.bind(this);
			this.handleKeyPressed = this.handleKeyPressed.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.submitMessage = this.submitMessage.bind(this);
		}

		componentDidMount() {


			this.currentUser = this.props.currentUser
		}

		handleMessage(e) {
			return this.setState({ message: e.target.value });
		}

		handleKeyPressed(e) {
			if (e.key === "Enter" && this.state.message.trim().length !== 0) {
				this.submitMessage();
			}
		}

		handleSubmit(e) {
			e.preventDefault();
			this.submitMessage();
		}

		submitMessage() {

			let d = new Date();
			let message = {
				id: d.getTime(),
				content: this.state.message,
				dateCreated: d.getDay(),
				ownerId: this.currentUser.id
				// ownerId: this.props.currentUser.id
			};
			this.setState({ message: "" });
			this.props.submitMessage(message);
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
								onKeyPress={this.handleKeyPressed}
								value={this.state.message}
							/>
							<button>Submit</button>
						</div>
					</form>
				</>
			);
		}
	}
);
