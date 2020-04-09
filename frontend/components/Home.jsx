import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default class Home extends Component {
	render() {
		return (
			<div className="outter-home-container">
				<Header />
				<div className="main">
					<div className="c-billboard">
						<div className="c-billboard-containter">
							<div className="c-illustration">
								<img
									src="https://a.slack-edge.com/dd0405/marketing/img/solutions/remote-work/img-hero-remote.jpg"
									srcset="https://a.slack-edge.com/dd0405/marketing/img/solutions/remote-work/img-hero-remote.jpg 1x, https://a.slack-edge.com/dd0405/marketing/img/solutions/remote-work/img-hero-remote@2x.jpg 2x"
									alt="A Slack channel surrounded by people’s profile photos and messages like “Working from home!” and “Commuting, be there soon”"
								/>
							</div>
							<div className="c-text">
								<div className="c-kicker-text">
									Work from Home
								</div>
								<h1>
									Quack! brings the team together, wherever
									you are
								</h1>
								<div className="c-subtext">
									With all of your communication and tools in
									one place, remote teams will stay productive
									no matter where you’re working from.
								</div>

								<div className="tryDemoButtons">
									<button
										onClick={() => {
											this.props.history.push("./signup");
										}}
										className="getStartedButton"
									>
										<Link to={`/signup`}>Sign up</Link>
									</button>
									<button
										onClick={() =>
											this.props.history.push("./login")
										}
										className="tryDemoButton"
									>
										<Link to={`/login`}>Sign in</Link>
									</button>
									<div className="usingQuack">
										Already using Quack!? {" "}
										<Link to={`/login`}>Sign in</Link>.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
