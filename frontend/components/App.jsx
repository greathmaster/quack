import React from "react";
import { Route } from "react-router-dom";
import LoginFormContainer from "./LoginFormContainer";
import SignupFormContainer from "./SignupFormContainer";
import { Link } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import Header from "./Header";
import Home from "./Home";
import Channel from "./Channel";

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
				{/* <Header exact path="/" /> */}
				<Route exact path="/" component={Home} />
				<AuthRoute
					exact
					path="/login"
					component={LoginFormContainer}
					redirect="/channel"
				/>
				<AuthRoute
					exact
					path="/signup"
					component={SignupFormContainer}
					redirect="/channel"
				/>
				{/* <ProtectedRoute exact path="/channel/:id" component={Channel} redirect="/login" /> */}
				<Route
					path="/channel/:id"
					render={props => (
						<Channel
							{...props}
							cableApp={this.props.cableApp}
						/>
					)}
				/>
				{/* <Route exact path="/props-through-render" render={(props) => <PropsPage {...props} title={`Props through render`} />} /> */}
			
			</>
		);
	}
}

export default App;
