import * as ChannelAPIUtil from "../util/channel_api_util";
import { receiveAllMessages } from "./messagesActions";
import { receiveOtherUsers } from "./session_actions";
import ls from 'local-storage'

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
			let chID = user.channels[0].id
			let localID = ls.get('lastChannelID')
			if(localID) {
				chID = localID
			}
			dispatch(fetchAllChannelMessages(chID));
		}
		dispatch(receiveAllChannels(user.channels));
	});
};

export const fetchOnlyChannels = (currentUser) => dispatch => {
	return ChannelAPIUtil.fetchAllChannels(currentUser).then(function(user) {
		dispatch(receiveAllChannels(user.channels));
	});
}

export const fetchAllChannelMessages = channelId => dispatch => {
	// debugger
	return ChannelAPIUtil.fetchAllChannelMessages(channelId).then(function(
		channel
	) {
		dispatch(receiveOtherUsers(channel.users));
		dispatch(receiveAllMessages(channel.messages));
	});
};

export const createNewChannel = (channel, redirect) => dispatch => {
	// debugger
	return ChannelAPIUtil.createNewChannel(channel).then(function(channel) {
		
		dispatch(fetchOnlyChannels({id: channel.owner_id}))
		if(redirect) {
			redirect(channel.id)
		}
	})
}
