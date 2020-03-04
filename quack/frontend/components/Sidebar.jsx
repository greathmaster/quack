import React from "react";
import SidebarInfo from "../components/SidebarInfo";
import SidebarList from "../components/SidebarList";

export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		let dms = [
			"Donald Duck",
			"Daffy Duck",
			"Afflack Duck",
			"Scrooge McDuck",
		];
		let channels = [
			"# Flying Tips",
			"# Mallard Central",
			"# Lakes",
			"# Seasonal Migrations",
			"# Navigation",
		];

		return (
			<>
				<SidebarInfo channelName={"App Academy"} username={"Hersha Venkatesh"} />
				<SidebarList name={"Channels"} items={channels} />
				<SidebarList name={"Direct Messages"} items={dms} />
			</>
		);
	}
}
