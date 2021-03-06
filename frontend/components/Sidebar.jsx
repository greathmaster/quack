import React from "react";
import SidebarInfo from "../components/SidebarInfo";
import SidebarList from "../components/SidebarList";
import { connect } from "react-redux";
import { fetchAllChannels } from "../actions/channels_actions";
import CreateNewChannel from "../components/CreateNewChannel";

function mSTP(state, ownProps) {
	return {
		channels: state.entities.channels,
		currentUser: state.entities.users[state.session.id],
	};
}

function mDTP(dispatch) {
	return {
		fetchAllChannels: (currentUser) =>
			dispatch(fetchAllChannels(currentUser)),
	};
}

export default connect(
	mSTP,
	mDTP
)(
	class Sidebar extends React.Component {
		constructor(props) {
			super(props);
		}

		componentDidMount() {
			// this.props.fetchAllChannels(this.props.currentUser);
		}

		renderSidebarInfo() {
			return (
				<SidebarInfo
					channelName={"Quack!"}
					currentUser={this.props.currentUser}
				/>
			);
		}

		render() {
			if (Object.keys(this.props.channels).length === 0) {
				return this.renderSidebarInfo();
			}
			return (
				<>
					{this.renderSidebarInfo()}

					<SidebarList
						name={"Channels"}
						items={Object.values(this.props.channels).filter(
							(channel) => {
								return channel.private === false;
							}
						)}
					/>
					<CreateNewChannel type="public" />
					<br />
					<br />
					<CreateNewChannel type="private" />
					<SidebarList
						name={""}
						items={Object.values(this.props.channels).filter(
							(channel) => {
								// debugger
								return channel.private === true;
							}
						)}
					/>
				</>
			);
		}
	}
);
