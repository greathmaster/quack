import React from "react";
import Logout from "../components/Logout";

function SidebarInfo(props) {

	return (
		<div className="sideBarInfoContainer">
			<div className="sideBarInfoChannelName" >{props.channelName}</div>
			<div className="sideBarInfoUsername">{props.username}</div>
			<Logout />
		</div>
	);
}

export default SidebarInfo;
