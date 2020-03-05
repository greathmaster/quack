import React from 'react'

function SidebarInfo(props) {

	//what are my props?
	//Channel Name
	//Current User??
	//JumpTo Channel search functionality Link?

	return (
		<div>
			{props.channelName}
			{props.username}
			
		</div>
	) 
	
}

export default SidebarInfo;