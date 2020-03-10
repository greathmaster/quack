import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllChannelMessages } from "../actions/channels_actions";
import ls from 'local-storage'

function mDTP(dispatch) {
	return {
		fetchAllChannelMessages: channelId => {
			return dispatch(fetchAllChannelMessages(channelId));
		},
	};
}

export default connect(
	null,
	mDTP
)(
	class SidebarList extends React.Component {
		constructor(props) {
			super(props);
			this.handleClick = this.handleClick.bind(this);
		}

		componentDidUpdate() {
			// this.props.items.forEach((item) => {
			// 	return this.props.establishWebSocketSubscription(item.id)
			// })
		}

		handleClick(id) {
			event.preventDefault();
			this.props.establishWebSocketSubscription(id);
			this.props.fetchAllChannelMessages(id); //get all channel messages
			ls.set('lastChannelID', id)
		}

		render() {
			if (!this.props.items || this.props.items.length == 0) {
				return null;
			}
			const i = this.props.items.map(item => {
				return (
					<div className="sidebarListItem">
						{/* <span className='dot'></span><span className="sidebarListItem">{item.name}</span> */}
						{/* <span className="dot"></span> */}
						<Link
							className="sidebarListItem"
							onClick={() => this.handleClick(item.id)}
							to={`/channel/${item.id}`}
						>
							{`# ${item.name}`}
						</Link>
					</div>
				);
			});

			return (
				<div className="sidebarList">
					<h3 className="sidebarListName">{this.props.name}</h3>
					<ul>{i}</ul>
				</div>
			);
		}
	}
);
