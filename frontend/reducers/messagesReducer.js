import { RECEIVE_ALL_MESSAGES } from "../actions/messagesActions";
import { RECEIVE_SINGLE_MESSAGE } from "../actions/messagesActions";

export default function messagesReducer(prevState = {}, action) {
	Object.freeze(prevState);

	switch (action.type) {
		case RECEIVE_ALL_MESSAGES:
			return action.messages;

		case RECEIVE_SINGLE_MESSAGE:
			let newState = Object.assign({}, prevState);
			newState[action.message.id] = action.message;
			return newState;

		default:
			return prevState;
	}
}
