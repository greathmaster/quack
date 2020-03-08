import React from "react";
import userImage from "../../app/assets/images/user.jpg";


export default function SingleMessage(props) {
	return (
		<div className="singleMessage">
			<div className="avatarContainer">
				<img className="avatar" src={userImage} />
			</div>
			<div className="messageContainer">
				<div className="senderNameInfo">
					<span className="username">{props.username}</span>
					<span className="timestamp">{props.timestamp}</span>
				</div>
				<div className="messageContent">
					<p>{props.message}</p>
				</div>
			</div>
		</div>
	);
}
