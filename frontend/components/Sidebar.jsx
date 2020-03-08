import React from "react";
import SidebarInfo from "../components/SidebarInfo";
import SidebarList from "../components/SidebarList";
import { connect } from "react-redux";
import { fetchAllChannels } from "../actions/channels_actions";

function mSTP(state, ownProps) {
	return {
		channels: state.entities.channels,
		currentUser: state.entities.users[state.session.id],
	};
}

function mDTP(dispatch) {
	return {
		fetchAllChannels: currentUser =>
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
			this.props.fetchAllChannels(this.props.currentUser);
		}

		render() {
			if (Object.keys(this.props.channels).length === 0) {
				return (
					<SidebarInfo
						channelName={"App Academy"}
						username={"Hersha Venkatesh"}
					/>
				);
				// return null;
			}
			return (
				<>
					<SidebarInfo
						channelName={"App Academy"}
						username={"Hersha Venkatesh"}
					/>
					<SidebarList
						name={"Channels"}
						items={this.props.channels}
					/>
					{/* <SidebarList
						name={"Channels"}
						items={this.props.channels.filter(channel => {
							return channel.private === true;
						})}
					/> */}
				</>
			);
		}
	}
);
