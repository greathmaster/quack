class Api::ChannelsController < ApplicationController
	def show
		@channel = Channel.find_by_id(params[:id])
		@messages = @channel.messages.includes(:user)
	end

	# def channel_params
	# 	params.require(:channel).permit(:id, :name, :owner_id, :private)
	# end
end
