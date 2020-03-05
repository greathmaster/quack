import React, { Component } from "react";
import {Link} from "react-router-dom"

export default class Home extends Component {
	render() {
		return (
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
						Quack! replaces email inside your company!
					</div>
					<div className="additionalBenefit">
						Keep conversations organized in Slack, the smart
						alternative to email.
					</div>
					<div className="tryDemoButtons">
						<button className="getStartedButton">Try Quack</button>
						<button className="tryDemoButton">See the Demo</button>
					</div>
					<div className="usingQuack">Already using Quack? <Link to={`/login`}>Sign in</Link>.</div>
				</div>
				<div className="rightPage"></div>
			</div>
		);
	}
}
