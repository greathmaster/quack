import * as MessageAPIUtil from '../util/message_api_util'
import {fetchAllChannelMessages} from './channels_actions'

export const RECEIVE_ALL_MESSAGES = "RECEIVE_ALL_MESSAGES";
export const RECEIVE_SINGLE_MESSAGE = "RECEIVE_SINGLE_MESSAGE";



export const receiveAllMessages = (messages) => {
	return {
		type: RECEIVE_ALL_MESSAGES,
		messages,
	};
};

export const receiveSingleMessage = (message) => {
	return {
		type: RECEIVE_SINGLE_MESSAGE,
		message,
	};
};

export const createNewMessage = message => dispatch => {
	return MessageAPIUtil.createNewMessage(message).then(function() {
		// dispatch(receiveSingleMessage(newMessage))
		dispatch(fetchAllChannelMessages(message.channel_id))
	});
};