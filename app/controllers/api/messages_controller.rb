class Api::MessagesController < ApplicationController
	def create
		@message = Message.new(message_params)
		@channel = Channel.find_by_id(message_params[:channel_id])

		if @message.save
			ChannelsChannel.broadcast_to(@channel, {
				room: @channel.id,
				users: @channel.users,
				messages: @message.content
			})
			render json: @message;
		else
			render json: @message.errors.full_messages, status: 422
		end
	end

	def message_params
		params.require(:message).permit(:content, :channel_id, :sender_id)
	end
end
