import * as ChannelAPIUtil from "../util/channel_api_util";
import { receiveAllMessages } from "./messagesActions";
import { receiveOtherUsers } from "./session_actions";

export const RECEIVE_ALL_CHANNELS = "RECEIVE_ALL_CHANNELS";
export const CREATE_NEW_CHANNEL = "CREATE_NEW_CHANNEL";

export const receiveAllChannels = channels => {
	return {
		type: RECEIVE_ALL_CHANNELS,
		channels,
	};
};

export const fetchAllChannels = currentUser => dispatch => {
	return ChannelAPIUtil.fetchAllChannels(currentUser).then(function(user) {
		if (user.channels.length !== 0) {
			dispatch(fetchAllChannelMessages(user.channels[0].id));
		}
		dispatch(receiveAllChannels(user.channels));
	});
};

export const fetchAllChannelMessages = channelId => dispatch => {
	return ChannelAPIUtil.fetchAllChannelMessages(channelId).then(function(
		channel
	) {
		dispatch(receiveOtherUsers(channel.users));
		dispatch(receiveAllMessages(channel.messages));
	});
};

// export const createNewChannel = (channel) => {
// 	return {
// 		type: CREATE_NEW_CHANNEL,
// 		channel,
// 	};
// };
