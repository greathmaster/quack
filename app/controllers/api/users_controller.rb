class Api::UsersController < ApplicationController
	def create
	  @user = User.new(user_params)
		@channel = Channel.find_by(name: "global")

	  if @user.save
		@channel.users << @user
		@user.update_attribute(:default_channel_id, @channel.id)

		login(@user)
		render "api/users/show"
	  else
		render json: @user.errors.full_messages, status: 200
	  end
	end

	def show
		@user = current_user;
		render "api/users/show"
	end

	def update

		user = User.find(params[:id])
		if user.update(user_params)
		else
			render json: user.errors.full_messages, status: 422
		end
	end
  
	private
  
	def user_params
	#   params.require(:user).permit(:username, :password, :avatar)
	  params.require(:user).permit!

	end
  end
  