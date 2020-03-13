import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default class Home extends Component {
	render() {
		return (
			<>
				<Header />
				<div className="homePageSplash">
					{/* <video 
					autoPlay="" 
					loop="" 
					muted="" 
					playsInline="" 
					className="o-hero__background o-hero__background--video" 
					poster="https://a.slack-edge.com/59662/marketing/img/homepage/video/brand-campaign_hero-poster.jpg">
						<source src="https://a.slack-edge.com/085e3/marketing/img/homepage/video/brand-campaign_hero-video.mp4" 
								type="video/mp4"
						/>

				</video> */}
				
					<div className="leftPage">
						<div className="benefitStatment">
							Quack! replaces email inside your flock!
						</div>
						<div className="additionalBenefit">
							Keep conversations organized in Quack!, the avian
							alternative to email.
						</div>
						<div className="tryDemoButtons">
							<button className="getStartedButton">
								<Link to={`/signup`}>Sign up</Link>.
							</button>
							<button className="tryDemoButton">
								<Link to={`/login`}>Sign in</Link>.
							</button>
						</div>
						<div className="usingQuack">
							Already using Quack?{" "}
							<Link to={`/login`}>Sign in</Link>.
						</div>
					</div>
					<div className="rightPage"></div>
				</div>
			</>
		);
	}
}
