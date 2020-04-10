import React from "react";
import Logout from "../components/Logout";
import { Icon, InlineIcon } from "@iconify/react";
import logoutIcon from "@iconify/icons-websymbol/logout";

function SidebarInfo(props) {
	return (
		<>
			<div className="outer-sidebar-info-container">
				<div className="sideBarInfoContainer">
					<div className="sideBarInfoChannelName">App Academy</div>
					<div className="sidebar-info-username-row">
						<span className="dot"></span>
						<span className="sidebar-info-username">
							Hersha Venkatesh
						</span>
					</div>
				</div>
				<div className="sidebar-info-logout"><Icon icon={logoutIcon} /></div>
			</div>
		</>
	);
}

export default SidebarInfo;
