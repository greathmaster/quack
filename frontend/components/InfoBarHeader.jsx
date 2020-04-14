import React from "react";
import { Icon, InlineIcon } from "@iconify/react";
import outlineClose from "@iconify/icons-ic/outline-close";

export default function InfoBarHeader(props) {
	return (
		<div className="info-bar-header-container">
			<div className="info-bar-header">
				<div className="info-bar-text">
					<div className="info-bar-header-title">
						{props.firstLine}
					</div>
					<div className="info-bar-header-channel-details">
						{props.secondLine}
					</div>
				</div>
			</div>
			<div onClick={props.closeInfoBar} className="info-bar-header-close-button">
				<InlineIcon icon={outlineClose} />
			</div>
		</div>
	);
}
