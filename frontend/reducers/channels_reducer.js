import { RECEIVE_ALL_CHANNELS } from "../actions/channels_actions";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

export default function channelsReducer(prevState = {}, action) {
	switch (action.type) {
		case RECEIVE_ALL_CHANNELS:
			return action.channels;

		case RECEIVE_CURRENT_USER:
			return action.currentUser.channels;

		default:
			return prevState;
	}
}
