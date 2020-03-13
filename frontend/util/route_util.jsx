import React from "react";
import { withRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Auth = ({
	component: Component,
	path,
	loggedIn,
	exact,
	redirect = "/",
	defaultChannel,
}) => (
	<Route
		path={path}
		exact={exact}
		render={props =>
			!loggedIn ? <Component {...props} /> : <Redirect to={redirect} />
		}
	/>
);

const Protected = props => {
	let Component = props.component;
	let loggedIn = props.loggedIn;
	return (
		<Route
			path={props.path}
			exact={props.exact}
			render={props =>
				loggedIn ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};

const Special = ({
	component: Component,
	path,
	loggedIn,
	exact,
	redirect = "/",
	defaultChannelID,
}) => {
	return (
		<Route
			path={path}
			exact={exact}
			render={props =>
				loggedIn && path == '/channel'? <Component {...props} /> : <Redirect to={redirect} />
			}
		/>
	);
};
//window.location.href
const mapStateToProps = state => {
	return {
		loggedIn: Boolean(state.session.id),
	};
};

const mapStateToProps2 = state => {
	let defaultChannelID = false;
	if (Object.values(state.entities.channels).length !== 0) {
		defaultChannelID = Object.values(state.entities.channels)[0][id];
	}

	return {
		loggedIn: Boolean(state.session.id),
		defaultChannelID: defaultChannelID,
	};
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
// export const SpecialRoute = withRouter(connect(mapStateToProps2)(Special));
