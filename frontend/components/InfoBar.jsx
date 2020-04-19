import React, { Component } from "react";
import { closeInfoBar } from "../actions/ui_actions";
import { connect } from "react-redux";
import InfoBarHeader from "../components/InfoBarHeader";
import InfoBarMembersList from "../components/InfoBarMembersList";
import { withRouter } from "react-router-dom";

function mapStateToProps(state, ownProps) {
	return {
		infobar: state.ui.infobar,
		channel: state.entities.channels[ownProps.match.params.id],
	};
}

function mapDispatchToProps(dispatch) {
	return {
		closeInfoBar: () => dispatch(closeInfoBar()),
	};
}

class InfoBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (!this.props.infobar) {
			return null;
		}

		let header;
		let main;

		switch (this.props.infobar.type) {
			case "membersList":
				let channelNameRightSidebar = "";
				if (!!this.props.channel) {
					
					if (!this.props.channel.private) {
						channelNameRightSidebar = `#${this.props.channel.name}`;
					} else {
						channelNameRightSidebar = this.props.channel.name;
					}
				}

				header = (
					<InfoBarHeader
						firstLine={"Members"}
						secondLine={channelNameRightSidebar}
					/>
				);

				main = <InfoBarMembersList />;
				break;
			default:
				break;
		}
		return (
			<div className="info-bar">
				{header}
				{main}
			</div>
		);
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(InfoBar)
);
