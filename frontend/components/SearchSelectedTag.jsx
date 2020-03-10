import React from "react";
import userImage from "../../app/assets/images/user.jpg";
import { Icon } from "@iconify/react";
import closeCircleOutline from '@iconify/icons-ion/close-circle-outline';


export default function SearchSelectedTag(props) {
	return (
		<div>
			<div className="singleMessage">
				<div className="avatarContainer">
					<img className="avatar" src={userImage} />
				</div>
				<div className="messageContainer">
					<div className="senderNameInfo">
						<span className="username">{props.username}</span>
						<span className="searchSelectedTagRemoveX" onClick={props.handleRemoveSearchTag}><Icon icon={closeCircleOutline} /></span>
					</div>
				</div>
			</div>
		</div>
	);
}
