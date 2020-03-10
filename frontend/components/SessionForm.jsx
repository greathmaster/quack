import React from "react";
import { Icon, InlineIcon } from "@iconify/react";
import duckIcon from "@iconify/icons-mdi/duck";
import Header from "../components/Header";

export default class SessionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: "", password: "" };
		this.handleUsername = this.handleUsername.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	handleUsername(e) {
		this.setState({ username: e.target.value });
	}

	handlePassword(e) {
		this.setState({ password: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.processForm(this.state);
	}

	componentDidMount() {
		// $.ajax({
		// 	url: "https://randomuser.me/api/",
		// 	dataType: "json",
		// 	success: (data) => {
		// 		this.setState({
		// 			username: data.results[0].login.username,
		// 			password: "123123",
		// 		});
		// 	},
		// });
	}

	renderErrors() {
		return (
			<>
				<ul className="errorsUl">
					{this.props.errors.map((error, i) => (
						<li className="alert" key={`error-${i}`}>
							<span className="customDuck">
								<Icon icon={duckIcon} />
							</span>
							{error}
						</li>
					))}
				</ul>
			</>
		);
	}

	render() {
		return (
			<>
				<Header />
				<div className="loginFormContainer">
					<div className="loginForm">
						{this.renderErrors()}
						<h1 className="loginFormHeader">
							{this.props.formType === "signup"
								? "Register for Quack"
								: "Sign in to App Academy"}
						</h1>
						<p className="properties message">
							app-academy.slack.com
						</p>

						<div className="loginFormMiddleContainer">
							<div className="loginFormSubContainer">
								<p className="properties">
									Enter your{" "}
									<span className="strong">
										email address
									</span>{" "}
									and <span className="strong">password</span>
									.
								</p>

								<form onSubmit={this.onSubmit}>
									<input
										type="text"
										onChange={this.handleUsername}
										value={this.state.username}
										placeholder={"Username"}
										className="signinup"
									/>

									<input
										type="text"
										onChange={this.handlePassword}
										value={this.state.password}
										placeholder={"Password"}
										className="signinup"
									/>
									<br />
									<button
										className="buttonLogin"
										onSubmit={this.onSubmit}
									>
										Sign in
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}
