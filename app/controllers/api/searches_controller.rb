class Api::SearchesController < ApplicationController
	
	# Expected format:
	# {
	# 	type: "users",
	# 	filter: {
	# 		username: "daisy",
	# 	}
	# }
	def users_search
		@users = User.all
		render "api/searches/users"
	end
end
