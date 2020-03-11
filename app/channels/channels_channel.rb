require "byebug"
class ChannelsChannel < ApplicationCable::Channel
	def subscribed
		@room =  Channel.find_by_id(params[:room])
		stream_for @room
	end

	def received(data)
		ChannelsChannel.broadcast_to(@room, {channel: @room, users: @room.users, messages: @room.messages})
	end

	def unsubscribed
		
	end
end