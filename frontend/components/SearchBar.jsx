import React, { Component } from "react";
import { Icon } from "@iconify/react";
import userIcon from "@iconify/icons-fa-regular/user";

export default class SearchBar extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		
		return (
			<div className="searchBar">
				<div className="channelName">{this.props.channel && `# ${this.props.channel.name}`}</div>
				<div className="numMembersContainer">
					<Icon className="numMembersIcon" icon={userIcon} />
					<span className="numMembers">{this.props.numMembers}</span>
				</div>
			</div>
		);
	}
}