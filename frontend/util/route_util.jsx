import React from "react";
import { withRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Auth = ({
	component: Component,
	path,
	loggedIn,
	exact,
	redirect = "/",
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
	let cableApp = props.component;
	return (
		<Route
			path={props.path}
			exact={props.exact}
			render={props =>
				loggedIn ? (
					<Component {...props} cableApp={cableApp} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

const mapStateToProps = state => {
	return { loggedIn: Boolean(state.session.id) };
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
