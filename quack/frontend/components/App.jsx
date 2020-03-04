import React from "react";
import { Route } from "react-router-dom";
import LoginFormContainer from "./LoginFormContainer";
import SignupFormContainer from "./SignupFormContainer";
import { Link } from "react-router-dom";
import { AuthRoute } from "../util/route_util";
import Header from "./Header";
import Home from "./Home";
import Channel from "./Channel"

const App = () => (
	<>
		{/* <header>
      <Link to="/" className="header-link">
        <h1>Its Quacking Time!</h1>
      </Link>
    </header> */}
		{/* <Header /> */}
		{/* <Route exact path="/" component={Home} /> */}
		{/* <Route exact path="/channel/" component={Channel} /> */}
		<Route exact path="/" component={Channel} />
		<AuthRoute exact path="/login" component={LoginFormContainer} />
		<AuthRoute exact path="/signup" component={SignupFormContainer} />
	</>
);

export default App;
