class Api::MessagesController < ApplicationController
	def create
		@message = Message.new(message_params)
		@channel = Channel.find_by_id(message_params[:channel_id])

		if @message.save
			ChannelsChannel.broadcast_to(@channel, {
				room: @channel.id,
				message_id: @message.id,
				# users: @channel.users,
				# json.avatar message.user.avatar.attached? ? url_for(message.user.avatar) : nil

				avatar: @message.user.avatar.attached? ? url_for(@message.user.avatar) : nil,
				message: @message.content,
				sender_id: @message.sender_id,
				created_at: @message.created_at,
				updated_at: @message.updated_at

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
