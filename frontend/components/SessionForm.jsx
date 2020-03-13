import React from "react";
import { Icon, InlineIcon } from "@iconify/react";
import duckIcon from "@iconify/icons-mdi/duck";
import Header from "../components/Header";
import { withRouter } from "react-router-dom";

export default withRouter(
	class SessionForm extends React.Component {
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
			this.props.processForm(this.state, id => {
				this.props.history.push(`/channel/${id}`);
			});
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

		loginDemoUser(e) {
			e.preventDefault();
			this.props.processForm(
				{ username: "daisy", password: "123123" },
				id => {
					this.props.history.push(`/channel/${id}`);
				}
			);
		}

		renderDemoUserButton() {
			return (
				<>
					<form onClick={(e) => this.loginDemoUser(e)}>
						<button className="buttonLogin">Demo User</button>
					</form>
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
									? "Register for Quack!"
									: "Sign in to Quack!"}
							</h1>
							<p className="properties message">
								quack-academy.quack.com
							</p>

							<div className="loginFormMiddleContainer">
								<div className="loginFormSubContainer">
									<p className="properties">
										Enter your{" "}
										<span className="strong">username</span>{" "}
										and{" "}
										<span className="strong">password</span>
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
											{this.props.formType === "signup"
												? "Sign up"
												: "Sign in"}
										</button>
									</form>
									{this.renderDemoUserButton()}
								</div>
							</div>
						</div>
					</div>
				</>
			);
		}
	}
);
