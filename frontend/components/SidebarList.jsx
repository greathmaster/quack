import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAllChannelMessages } from "../actions/channels_actions";
import ls from "local-storage";
import { withRouter } from "react-router-dom";

function mDTP(dispatch) {
	return {
		fetchAllChannelMessages: channelId => {
			return dispatch(fetchAllChannelMessages(channelId));
		},
	};
}

export default withRouter(
	connect(
		null,
		mDTP
	)(
		class SidebarList extends React.Component {
			constructor(props) {
				super(props);
			}

			componentDidUpdate() {
				// this.props.items.forEach((item) => {
				// 	return this.props.establishWebSocketSubscription(item.id)
				// })
			}

			render() { 
				if (!this.props.items || this.props.items.length == 0) {
					return null;
				}

				const i = this.props.items.map(item => {
					return (
						<div className={item.id == this.props.match.params.id ? "sidebarListItemSelected": "sidebarListItem"} key={item.id}>
							{/* <span className='dot'></span><span className="sidebarListItem">{item.name}</span> */}
							{/* <span className="dot"></span> */}
							<Link
								className="sidebarListItem"
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
	)
);
