import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormContainer from "./LoginFormContainer";
import SignupFormContainer from "./SignupFormContainer";
import { AuthRoute, ProtectedRoute, SpecialRoute } from "../util/route_util";
import Home from "./Home";
import Channel from "./Channel";
import Search from "./Search";
import Listener from "./Listener";
import CreateNewChannelForm from "../components/createNewChannelForm";
// import GoBack from "../components/GoBack";
import Profile from "../components/Profile"

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
				<Listener />
				<Switch>
					<AuthRoute
						exact
						path="/login"
						component={LoginFormContainer}
						redirect={`/channel/`}
					/>

					<AuthRoute
						exact
						path="/signup"
						component={SignupFormContainer}
						redirect="/channel"
					/>

					<ProtectedRoute exact path="/search" component={Search} />

					<ProtectedRoute
						exact
						path="/createChannel"
						component={CreateNewChannelForm}
					/>

					<ProtectedRoute
						exact
						path="/channel/:id"
						component={Channel}
						redirect="/login"
					/>
					{/* <ProtectedRoute
						path="/channel/"
						redirect={`/channel/${this.props.store.s}`}
					/> */}
					<ProtectedRoute
						exact
						path="/profile"
						component={Profile}
						redirect="/login"
					/>

					<Route exact path="/" component={Home} />
				</Switch>
			</>
		);
	}
}

export default App;
