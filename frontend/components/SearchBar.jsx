import React, { Component } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import userIcon from "@iconify/icons-fa-regular/user";
import { connect } from "react-redux";
import { openInfoBar, closeInfoBar } from "../actions/ui_actions";
import { withRouter } from "react-router-dom";
import infoIcon from "@iconify/icons-jam/info";

function mapStateToProps(state, ownProps) {
	return {
		infobar: state.ui.infobar,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		openInfoBar: (infobar) => dispatch(openInfoBar(infobar)),
		closeInfoBar: () => dispatch(closeInfoBar()),
	};
}

class SearchBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="searchBar">
				<div className="searchBarChannelInfo">
					<div className="channelName">
						{this.props.channel && `#${this.props.channel.name}`}
					</div>
					<div
						onClick={
							!!this.props.infobar
								? () => this.props.closeInfoBar()
								: () =>
										this.props.openInfoBar({
											type: "membersList",
										})
						}
						className="numMembersContainer"
					>
						<Icon className="numMembersIcon" icon={userIcon} />
						<span className="numMembers">
							{this.props.numMembers}
						</span>
					</div>
				</div>

				<div className="searchBarRightContent">
					<div
						onClick={
							!!this.props.infobar
								? () => this.props.closeInfoBar()
								: () =>
										this.props.openInfoBar({
											type: "membersList",
										})
						}
						className="searchBarRightInfoIconContainer"
					>
						<InlineIcon icon={infoIcon} />
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SearchBar)
);
