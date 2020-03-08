class Api::MessagesController < ApplicationController
	def create
		@message = Message.new(message_params)
		if @message.save
			render json: @message;
		else
			render json: @message.errors.full_messages, status: 422
		end
	end

	def message_params
		params.require(:message).permit(:content, :channel_id, :sender_id)
	end
end
