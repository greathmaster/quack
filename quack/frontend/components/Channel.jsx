import React, { Component } from "react";
import Sidebar from '../components/Sidebar'
import userImage from "../../app/assets/images/user.jpg"


export default class Channel extends Component {

	constructor(props) {
		super(props)
		//what are my props?
		//messages w/ associated users
		//
	}

	render() {
		return (
			<div className="channelContainer">
				<div className="sidebar">
					<Sidebar />
				</div>
				<div className="chatContainer">
					<div className="searchBar"></div>
					<div className="mainChat">
						<div className="singleMessage">
							<div className="avatarContainer">
								<img className="avatar" src={userImage} />
							</div>
							<div className="messageContainer">
								<div className="senderNameInfo">
									<span className="username">Hersha Venkatesh</span> <span className="timestamp">7:16 AM</span>
								</div>
								<div className="messageContent">
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rutrum tristique odio, in fermentum dui varius eu. Suspendisse quis laoreet sem, vitae lobortis urna. Sed hendrerit semper dapibus. Curabitur sit amet nunc ultrices massa scelerisque congue. Morbi eu cursus quam, eget euismod quam. Quisque aliquam massa in euismod fermentum. Curabitur pulvinar mollis sapien in semper. Morbi facilisis auctor libero, ut eleifend tellus dignissim sit amet. Nullam quis velit eu ex eleifend tempor nec molestie nulla.</p>
<br />
<p>Etiam ornare, ipsum in auctor pellentesque, tortor ante elementum metus, et sollicitudin eros lectus sed eros. In sit amet cursus lectus. Duis velit orci, euismod in ex quis, aliquam facilisis lectus. Maecenas aliquet turpis vel dignissim egestas. Praesent ornare lectus vel purus rutrum mollis. Cras non consequat dui. Nulla sodales rhoncus nulla, ut suscipit diam mollis ut. Sed suscipit feugiat ipsum, nec gravida magna pharetra eu. Suspendisse id dui eleifend, dapibus orci ac, rutrum odio.</p>
								</div>
							</div>
						</div>
					</div>
					<div className="chatBar"></div>
				</div>
			</div>
		);
	}
}

//main chat
//width 804
// height 510

//sidebar
//width 220
//height 510

//notice width + width = 1024

// chatbar
// width 804
// height 90 or 85 ?
//left margin 20 px
//right margin 20 px

//upper nav bar (the on with the search)
// width 804
//height 60

//Questons List...
//Application.css -> can't seem to use CSS in different files
//bootstrapped user for frontend auth doesn't seem to work
//any advise on classnames for CSS?
//right now it's just haphazard :/
//I can't get the images to show on the frontend
