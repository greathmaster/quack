import React, { Component } from "react";
import { findUsers } from "../util/search_api_util";
import SearchItem from "../components/SearchItem";
import SearchSelectedTag from "./SearchSelectedTag";
import { createNewChannel } from "../actions/channels_actions";
import { connect } from "react-redux";
import { Icon } from "@iconify/react";
import closeCircleOutline from "@iconify/icons-ion/close-circle-outline";
import { fetchAllChannelMessages } from "../actions/channels_actions";
import { Redirect } from "react-router-dom";
import userImage from "../../app/assets/images/user.jpg";


function mSTP(state, ownProps) {
	return {
		currentUser: state.entities.users[state.session.id],
	};
}

function mDTP(dispatch) {
	return {
		createNewChannel: (channel, redirect) =>
			dispatch(createNewChannel(channel, redirect)),
		fetchAllChannelMessages: channelId =>
			dispatch(fetchAllChannelMessages(channelId)),
	};
}

export default connect(
	mSTP,
	mDTP
)(
	class Search extends Component {
		constructor(props) {
			super(props);
			this.state = {
				searchStr: "",
				results: {},
				selected: [],
				newChannelID: null,
			};
			this.handleInput = this.handleInput.bind(this);
			this.handleClick = this.handleClick.bind(this);
			this.handleExit = this.handleExit.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.handleRemoveSearchTag = this.handleRemoveSearchTag.bind(this);
		}

		componentDidMount() {
			findUsers({
				type: "users",
			}).then(users => {
				this.setState({ results: users });
			});
		}

		handleInput(e) {
			this.setState({ searchStr: e.target.value });
		}

		handleClick(userId) {
			if (!this.state.selected.includes(userId)) {
				let newSel = [...this.state.selected];
				newSel.push(userId);
				this.setState({ selected: newSel });
			}
		}

		handleExit() {
			//this.props.history.push("/channel/");
			// this.props.history.pop()
			this.props.history.goBack();

		}

		handleRemoveSearchTag(userId) {
			let newSelected = this.state.selected.filter(selectedUserId => {
				return userId !== selectedUserId;
			});
			this.setState({ selected: newSelected });
		}

		matches() {
			const matches = [];

			Object.values(this.state.results).forEach(user => {
				const sub = user.username.slice(0, this.state.searchStr.length);
				if (sub.toLowerCase() === this.state.searchStr.toLowerCase()) {
					matches.push(user);
				}
			});

			return matches;
		}

		handleSubmit(e) {
			e.preventDefault();
			let channelName = "";

			let names = [];
			for (let i = 0; i < this.state.selected.length; i++) {
				names.push(this.state.results[this.state.selected[i]].username);
			}

			if (!names.includes(this.props.currentUser.username)) {
				names.push(this.props.currentUser.username);
			}

			channelName = names.join(", ");

			let users = [...this.state.selected, this.props.currentUser.id];

			let newChannel = {
				name: channelName,
				owner_id: this.props.currentUser.id,
				private: true,
				users: users,
			};
			this.props.createNewChannel(newChannel, id => {
				this.setState({ newChannelID: id });
			});
		}

		renderSelected() {
			return this.state.selected.map(userId => {
				return (
					<SearchSelectedTag
						className="searchSelectedTag"
						username={this.state.results[userId].username}
						handleRemoveSearchTag={() =>
							this.handleRemoveSearchTag(userId)
						}
					/>
				);
			});
		}
		render() {
			let m = this.matches();
			let users = m.map(user => {
				return (
					<SearchItem
						handleClick={() => this.handleClick(user.id)}
						key={user.id}
						username={user.username}
						avatar={user.avatar? user.avatar : userImage}
					/>
				);
			});
			if (!this.state.newChannelID) {
				return (
					<>
						<div className="searchExit">
							<span onClick={this.handleExit}>
								<Icon icon={closeCircleOutline} />
							</span>
						</div>
						<div className="searchContainer">
							<h2 className="searchDirectMessageHeader">
								Direct Message
							</h2>
							<form onSubmit={this.handleSubmit}>
								{this.props.private && (
									<input
										type="text"
										value={this.state.searchStr}
										onChange={this.handleInput}
										className="searchInput"
										placeholder="Enter a username"
									/>
								)}

								<div className="searchUpper">
									{this.renderSelected()}
									<div className="searchFieldAndButton">
										<input
											type="text"
											value={this.state.searchStr}
											onChange={this.handleInput}
											className="searchInput"
											placeholder="Enter a username"
										/>
										<button className="searchCreateDMButton">
											Go
										</button>
									</div>
								</div>
								<div>
									<div className="searchResults">
										{users.length === 0 ? (
											<SearchItem message="No matches" />
										) : (
											users
										)}
									</div>
								</div>
							</form>
						</div>
					</>
				);
			} else {
				return <Redirect to={`/channel/${this.state.newChannelID}`} />;
			}
		}
	}
);