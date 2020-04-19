import React, { Component } from "react";
import { Icon } from "@iconify/react";
import userIcon from "@iconify/icons-fa-regular/user";
import { connect } from "react-redux";
import { openInfoBar } from "../actions/ui_actions";
import {withRouter} from "react-router-dom"

function mapStateToProps(state, ownProps) {
	return {
		channels: state.entities.channels,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		openInfoBar: (infobar) => dispatch(openInfoBar(infobar)),
		closeInfoBar: () => dispatch(closeInfoBar())
	};
}

class SearchBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {

	//	const channelId = this.props.match.params.id;
	//	let channel = this.props.channels[channelId]

		
		return (
			<div className="searchBar">
				<div className="channelName">
					{this.props.channel && `#${this.props.channel.name}`}
				</div>
				<div
					onClick={() =>{
						this.props.openInfoBar({
							type: "membersList",
						})}
					}
					className="numMembersContainer"
				>
					<Icon className="numMembersIcon" icon={userIcon} />
					<span className="numMembers">{this.props.numMembers}</span>
				</div>
			</div>
		);
	}
}

export default withRouter(connect(null, mapDispatchToProps)(SearchBar));
