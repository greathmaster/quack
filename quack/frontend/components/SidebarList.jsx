import React from "react";

export default class SidebarList extends React.Component {
	constructor(props) {
		super(props);
		//what are my props?
		//array of channels or messages or whatever
	}

	componentDidMount() {
		//do we need to fetch them from here?
		//or should we retrieve them from props?
		//we may need a container component to map them in
	}

	render() {
		const i = this.props.items.map(item => {
			return <div>
					<span className='dot'></span><span className="sidebarListItem">{item}</span>
				</div>
		});

		return (
			<div className="sidebarList">
				<h3 className="sidebarListName">{this.props.name}</h3>
				<ul>{i}</ul>
			</div>
		);
	}
}
