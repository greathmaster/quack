class ApplicationController < ActionController::Base
	helper_method :current_user, :logged_in?, :require_login
	skip_before_action :verify_authenticity_token

	def current_user
		return nil unless session[:session_token]
		@current_user ||= User.find_by(session_token: session[:session_token])
	end

	def logged_in?
		!!current_user
	end

	def login(user)
		session[:session_token] = user.reset_session_token!
		@current_user = user
	end

	def logout
		current_user.reset_session_token!
		session[:session_token] = nil
		@current_user = nil

	end

	def require_login
		# redirect_to new_session_url unless logged_in?
		unless current_user
			render json: { base: ['invalid credentials'] }, status: 401
		end
	end
end
