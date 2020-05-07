import React, { Component } from "react";
import { InlineIcon } from "@iconify/react";
import searchIcon from "@iconify/icons-fe/search";
import { openModal } from "../actions/ui_actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function mapStateToProps(state, ownProps) {
	return {
		channels: state.entities.channels,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		openModal: (data) => dispatch(openModal(data)),
	};
}
class MessageSearch extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let currentChannel = this.props.channels[this.props.match.params.id];

		if (!currentChannel) return null;

		let searchText = `Search #${currentChannel.name}`;
		return (
			<div className="search-button-wrapper">
				<button
					className="search-button"
					onClick={(e) => {
						e.preventDefault();
						this.props.openModal({
							type: "messageSearchResults",
							refs: this.props.refs,
						});
					}}
				>
					<span className="search-icon">
						<InlineIcon icon={searchIcon} />
					</span>
					{searchText}
				</button>
			</div>
		);
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(MessageSearch)
);
