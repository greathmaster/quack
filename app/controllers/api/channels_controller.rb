class Api::ChannelsController < ApplicationController
	def show
		@channel = Channel.find_by_id(params[:id])
		@messages = @channel.messages.includes(:user)
	end

	def create
		# debugger
		@channel = Channel.create!({"name"=>channel_params[:name], "owner_id"=>channel_params[:owner_id], "private"=>channel_params[:private]})
		@users = User.find(channel_params[:users])
		# debugger
		@users.each do |user|
			@channel.users << user
		end
		render json: @channel;
	end

	def channel_params
		params.require(:channel).permit! #(:name, :owner_id, :private, members: [])
	end
end

# listener component, create a subscription for each channel id, 