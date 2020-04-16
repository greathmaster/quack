import React from "react";
import userImage from "../../app/assets/images/user.jpg";

export default function SearchItem(props) {
	return (
		<div onClick={props.handleClick} className="pointer">
			<div className="singleMessage">
				<div className="avatarContainer">
					{props.avatar && <img className="avatar" src={props.avatar} />}
				</div>
				<div className="messageContainer">
					<div className="senderNameInfo">
						<span className="username">{props.username}</span>
					</div>
					<div>{props.message}</div>
				</div>
			</div>
		</div>
		
	);
}
