import React, { Component } from "react";
import { connect } from "react-redux";
import ReactModal from "react-modal";
import Profile from "../components/Profile";

class Modal extends Component {
	constructor(props) {
		
		super(props);
	}

	render() {
		if (!this.props.modal) {
			return null;
		}

		let component;

		switch (this.props.modal.type) {
			case "editProfile":
				component = <Profile />;
				break;
			default:
				break;
		}

		return (
			<ReactModal
				isOpen={true}
				contentLabel="EditProfile"
				onRequestClose={this.props.closeModal}
				className="EditProfileModal"
				overlayClassName="EditProfileOverlay"
			>
				{component}
			</ReactModal>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { modal: state.ui.modal };
};

const mapDispatchToProps = (dispatch) => {
	return { closeModal: () => dispatch(closeModal()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
