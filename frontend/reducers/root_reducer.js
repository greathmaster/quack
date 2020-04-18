import { combineReducers } from "redux";

import errorsReducer from "./errors_reducer";
import entitiesReducer from "./entities_reducer";
import sessionReducer from "./session_reducer";
import uiReducer from "./ui_reducer";

import {LOGOUT_CURRENT_USER} from "../actions/session_actions"

const appReducer = combineReducers({
	entities: entitiesReducer,
	session: sessionReducer,
	errors: errorsReducer,
	ui: uiReducer
});

//We clear the state when someone logs out
//Adapted from: https://medium.com/@asher.cassetto.cohen/resetting-redux-state-with-a-root-reducer-bonus-how-to-reset-state-selectively-e2a008d0de61
function rootReducer(state, action) {
	if(action.type === LOGOUT_CURRENT_USER) {
		state = undefined
	}

	return appReducer(state, action);
}


export default rootReducer