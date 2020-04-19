import { OPEN_INFO_BAR, CLOSE_INFO_BAR } from "../actions/ui_actions";

export default function infobarReducer(prevState = null, action) {
	switch (action.type) {
		case OPEN_INFO_BAR:
			
			return action.infobar;
		case CLOSE_INFO_BAR:
			return null;
		default:
			return prevState;
	}
}