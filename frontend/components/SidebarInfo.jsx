import React from "react";
import Logout from "../components/Logout";

function SidebarInfo(props) {

	return (
		<div className="sideBarInfoContainer">
			<div className="sideBarInfoChannelName" >{props.channelName}</div>
			<div className="sideBarInfoUsernameContainer">
			<div className="sideBarInfoUsername"> <span className="duckUserIcon">🦆</span> {props.username}</div>
			<Logout />
			</div>
		</div>
	);
}

export default SidebarInfo;
