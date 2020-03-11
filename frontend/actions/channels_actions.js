import * as ChannelAPIUtil from "../util/channel_api_util";
import { receiveAllMessages } from "./messagesActions";
import { receiveOtherUsers } from "./session_actions";

export const RECEIVE_ALL_CHANNELS = "RECEIVE_ALL_CHANNELS";
export const RECEIVE_NEW_CHANNEL = "RECEIVE_NEW_CHANNEL";

export const receiveAllChannels = channels => {
	return {
		type: RECEIVE_ALL_CHANNELS,
		channels,
	};
};

export const receiveNewChannel = channel => {
	return {
		type: RECEIVE_NEW_CHANNEL,
		channel,
	};
};

export const fetchAllChannels = currentUser => dispatch => {
	return ChannelAPIUtil.fetchAllChannels(currentUser).then(function(user) {
		dispatch(receiveAllChannels(user.channels));
	});
};

export const fetchOnlyChannels = currentUser => dispatch => {
	return ChannelAPIUtil.fetchAllChannels(currentUser).then(function(user) {
		dispatch(receiveAllChannels(user.channels));
	});
};

export const fetchAllChannelMessages = channelId => dispatch => {
	return ChannelAPIUtil.fetchAllChannelMessages(channelId).then(function(
		channel
	) {
		dispatch(receiveOtherUsers(channel.users));

		dispatch(receiveAllMessages(channel.messages ? channel.messages : {}));
	});
};

export const createNewChannel = (channel, redirect) => dispatch => {
	return ChannelAPIUtil.createNewChannel(channel).then(newChannel => {
		dispatch(receiveNewChannel(newChannel));
		dispatch(() => redirect(newChannel.id))
	});
};
