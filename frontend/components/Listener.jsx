import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { receiveSingleMessage } from "../actions/messagesActions";

function mSTP(state, ownProps) {
	return {
		channels: state.entities.channels,
		currentUser: state.entities.users[state.session.id],
	};
}

function mDTP(dispatch) {
	return {
		receiveSingleMessage: message =>
			dispatch(receiveSingleMessage(message)),
	};
}

export default withRouter(
	connect(
		mSTP,
		mDTP
	)(
		class Listener extends Component {
			constructor(props) {
				super(props);
				this.createSubscriptions = this.createSubscriptions.bind(this);
				this.channels = [];
			}

			componentDidMount() {
				//if we have a logged in user
				if (this.props.currentUser) {
					this.createSubscriptions();
				}
			}

			componentDidUpdate(prevProps, prevState) {
				// debugger
				// if (
				// 	this.props.currentUser &&
				// 	prevProps.currentUser &&
				// 	this.props.currentUser.id !== prevProps.currentUser.id
				// ) {
				this.createSubscriptions();
				// }
			}

			addSingleSubscription(channelId) {
				this.channels.push(this.createSingleSubscription(channelId));
			}

			createSingleSubscription(channelId) {
				return App.cable.subscriptions.create(
					{
						channel: "ChannelsChannel",
						room: channelId,
					},
					{
						connected: () => {
							// console.log(`Connected to ${channelId}`);
						},

						disconnected: () => {
							// console.log(`Disconnected to ${channelId}`);
						},

						received: msgInfo => {
							let msg = {
								id: msgInfo.message_id,
								content: msgInfo.message,
								channel_id: msgInfo.room,
								sender_id: msgInfo.sender_id,
								created_at: msgInfo.created_at,
								updated_at: msgInfo.updated_at,
								// users: msgInfo.users 	users is also included in the response
							};

							this.props.receiveSingleMessage(msg);
						},
					}
				);
			}

			createSubscriptions() {
				this.channels = Object.values(
					this.props.channels
				).map(channel => this.createSingleSubscription(channel.id));
			}

			componentWillUnmount() {
				// close this.channels
				for (let i = 0; i < this.channels.length; i++) {
					let channel = this.channels[i];
					channel.unsubscribe();
				}
			}

			render() {
				if (!this.props.currentUser) return null;
				return <div>Listener</div>;
			}
		}
	)
);
