import React from "react";
import { Link } from "react-router-dom";
import { Icon, InlineIcon } from "@iconify/react";
import duckIcon from "@iconify/icons-mdi/duck";
import { withRouter } from "react-router-dom";

export default withRouter(
	class Header extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			return (
				<header>
					<div>
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
								<div className="links">
									<Link to={``} className="inline">
										Why Quack!?
									</Link>
									<Link to={``} className="inline">
										Solutions
									</Link>
									<Link to={``} className="inline">
										Resources
									</Link>
									<Link to={``} className="inline">
										Enterprise
									</Link>
									<Link to={``} className="inline">
										Pricing
									</Link>
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
					</div>
				</header>
			);
		}
	}
);
