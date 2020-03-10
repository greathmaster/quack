import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormContainer from "./LoginFormContainer";
import SignupFormContainer from "./SignupFormContainer";
// import { Link } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
// import Header from "./Header";
import Home from "./Home";
import Channel from "./Channel";
import Search from "./Search";
// import ls from "local-storage";

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
				<Switch>
					<AuthRoute
						exact
						path="/login"
						component={LoginFormContainer}
						// redirect={`/channel/${ls.get("lastChannelID")}`}
						// redirect={`/channel`}
					/>

					<AuthRoute
						exact
						path="/signup"
						component={SignupFormContainer}
						// redirect="/channel"
					/>

					<Route
						exact
						path="/search"
						render={props => (
							<Search
								{...props}
								private={false}
								cableApp={this.props.cableApp}
							/>
						)}
					/>
					<ProtectedRoute
						path="/channel/:id"
						cableApp={this.props.cableApp}
						// render={props => (
						// 	<Channel
						// 		{...props}
						// 		cableApp={this.props.cableApp}
						// 	/>
						// )}
						component={Channel}
						redirect="/login"
					/>

					{/* <Route
						path="/channel/:id"
						// cableApp={this.props.cableApp}
						render={props => (
							<Channel
								{...props}
								cableApp={this.props.cableApp}
							/>
						)}
						// component={Channel}
						redirect="/login"
					/> */}

					<Route exact path="/" component={Home} />
				</Switch>
			</>
		);
	}
}

export default App;
