import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllChannelMessages } from "../actions/channels_actions";

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

		componentDidMount() {
			//do we need to fetch them from here?
			//or should we retrieve them from props?
			//we may need a container component to map them in
		}

		handleClick(id) {
			event.preventDefault();
			//get all channel messages
			this.props.fetchAllChannelMessages(id)
		}

		render() {
			if (!this.props.items || this.props.items.length == 0) {
				return null;
			}
			const i = this.props.items.map(item => {
				return (
					<div>
						{/* <span className='dot'></span><span className="sidebarListItem">{item.name}</span> */}
						<span className="dot"></span>
						<Link
							onClick={() => this.handleClick(item.id)}
							to={`/channel/${item.id}`}
							className="sidebarListItem"
						>
							{item.name}
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
