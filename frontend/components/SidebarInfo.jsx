import React from "react";
import Logout from "../components/Logout";
import { connect } from "react-redux";
import { openModal } from "../actions/ui_actions";
import {displayName} from "../util/misc_util";

function SidebarInfo(props) {
	return (
		<>
			<div className="outer-sidebar-info-container">
				<div className="sideBarInfoContainer">
					<div className="sideBarInfoChannelName">Quack! Academy</div>
					<div className="sidebar-info-username-row">
						<span className="dot"></span>
						<span
							onClick={(e) => {
								e.preventDefault();
								props.openModal({
									type: "editProfile",
								});
							}}
							className="sidebar-info-username"
						>
							{props.currentUser && displayName(props.currentUser)}
						</span>
					</div>
				</div>

				<Logout />
			</div>
		</>
	);
}


function mapDispatchToProps(dispatch) {
	return {
		openModal: (data) => dispatch(openModal(data)),
	};
}

export default connect(null, mapDispatchToProps)(SidebarInfo);
