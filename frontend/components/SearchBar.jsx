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
				<div onClick={this.props.openInfoBar} className="numMembersContainer">
					<Icon className="numMembersIcon" icon={userIcon} />
					<span className="numMembers">{this.props.numMembers}</span>
				</div>
			</div>
		);
	}
}

// npm install --save-dev @iconify/react @iconify/icons-ic
// import { Icon, InlineIcon } from '@iconify/react';
// import outlineClose from '@iconify/icons-ic/outline-close';
