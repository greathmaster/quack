import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Icon } from "@iconify/react";
import duckIcon from "@iconify/icons-mdi/duck";
import linkedinIcon from "@iconify/icons-logos/linkedin";
import githubIconText from "@iconify/icons-logos/github";
import githubIcon from "@iconify/icons-logos/github-icon";
import angellistIcon from "@iconify/icons-logos/angellist";

export default withRouter(
	class Header extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			return (
				<header>
					<div className="outterHeader">
						<div className="nav">
							<div className="leftSide">
								<div className="logo">
									<h1 className="header">
										<span className="alignLogo">
											<Link
												className="headerLink2"
												to="/"
											>
												<Icon
													className="logo"
													icon={duckIcon}
												/>
												Quack!
											</Link>
										</span>{" "}
									</h1>
								</div>
								<div className="more-info">
									<span className="linkedin-logo-container">
										<a
											href="https://www.linkedin.com/in/hersha-venkatesh-19500b61/"
											target="_blank"
										>
											<Icon
												className="logo"
												icon={linkedinIcon}
											/>
										</a>
									</span>
									<span className="github-logo-container">
										<a
											href="https://github.com/greathmaster"
											target="_blank"
										>
											<Icon
												className="github-logo"
												icon={githubIcon}
											/>
											<Icon
												className="github-logo-text"
												icon={githubIconText}
											/>
										</a>
									</span>

									<span className="angel-list-logo-container">
										<a
											href="https://angel.co/u/hersha-venkatesh"
											target="_blank"
										>
											<Icon
												className="angel-list-logo"
												icon={angellistIcon}
											/>
											<span className="angel-list-logo-text">
												AngelList
											</span>
										</a>
									</span>
								</div>
							</div>
						</div>
						<div className="signInOut">
							<div className="links">
								<Link to={`/login`} className="inline">
									Sign in
								</Link>
							</div>
							<button
								onClick={() => {
									this.props.history.push("./signup");
								}}
								className="getStartedButton"
							>
								<Link to={`/signup`} className="inline">
									Get Started
								</Link>
							</button>
						</div>
					</div>
				</header>
			);
		}
	}
);
// // npm install --save-dev @iconify/react @iconify/icons-logos
// import { Icon, InlineIcon } from '@iconify/react';
// import linkedinIcon from '@iconify/icons-logos/linkedin';
