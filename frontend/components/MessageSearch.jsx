import React, { Component } from "react";
import { InlineIcon } from "@iconify/react";
import searchIcon from "@iconify/icons-fe/search";
import { openModal } from "../actions/ui_actions";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
	// Are you finding the excuse or are you finding the opportunity?

	return {
		openModal: (data) => dispatch(openModal(data)),
	};
}
class MessageSearch extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="search-button-wrapper">
				<button
					className="search-button"
					onClick={(e) => {
						e.preventDefault();
						this.props.openModal({
							type: "messageSearchResults",
							refs: this.props.refs
						});
					}}
				>
					<span className="search-icon">
						<InlineIcon icon={searchIcon} />
					</span>
					Search #global
				</button>
			</div>
		);
	}
}

export default connect(null, mapDispatchToProps)(MessageSearch);
