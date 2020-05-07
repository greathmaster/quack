import React from "react";
import userImage from "../../app/assets/images/user.jpg";

export default function SingleMessage(props) {

	return (
		<div className="singleMessage" ref={props.ref2} onClick={props.handleClick}>
			<div className="avatarContainer">
				<img
					className="avatar"
					src={props.avatar ? props.avatar : userImage}
				/>
			</div>
			<div className="messageContainer">
				<div className="senderNameInfo">
					<span className="username">{props.displayName}</span>
					<span className="timestamp">{props.timestamp}</span>
				</div>
				<div dangerouslySetInnerHTML={{__html:props.message}} className="messageContent" />
			</div>
		</div>
	);
}
