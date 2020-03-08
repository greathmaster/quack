import React from "react";
import { Route } from "react-router-dom";
import LoginFormContainer from "./LoginFormContainer";
import SignupFormContainer from "./SignupFormContainer";
import { Link } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import Header from "./Header";
import Home from "./Home";
import Channel from "./Channel";

// const App = () => (
// 	<>
// 		{/* <Header exact path="/" /> */}
// 		<Route exact path="/" component={Home} />
// 		<AuthRoute exact path="/login" component={LoginFormContainer} redirect="/channel"/>
// 		<AuthRoute exact path="/signup" component={SignupFormContainer} redirect="/channel" />

// 		<ProtectedRoute exact path="/channel/" component={Channel} redirect="/login" />
// 	</>
// );

class App extends React.Component {

	constructor(props) {
		super(props)
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
				<Route path="/channel/:id" component={Channel} />
			</>
		);
	}
}

export default App;
