import { RECEIVE_ALL_CHANNELS, RECEIVE_NEW_CHANNEL } from "../actions/channels_actions";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

export default function channelsReducer(prevState = {}, action) {
	switch (action.type) {
		case RECEIVE_ALL_CHANNELS:
			return action.channels;
		case RECEIVE_NEW_CHANNEL:
			let newState = Object.assign({}, prevState)
			newState[action.channel.id] = action.channel
			return newState;

		case RECEIVE_CURRENT_USER:
			return action.currentUser.channels;

		default:
			return prevState;
	}
}
