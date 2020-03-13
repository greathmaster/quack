# json.partial! "api/users/user", user: @user
# json.user do
# 	:id @user.id
# 	:username @user.username
# 	# json.channels @user.channels
# end
# json.extract! @user, :id, :username

# json.id @user.id
# json.username @user.username
# json.channels @user.channels
# json.last_channel_id @user.last_channel_id

json.id @user.id
json.username @user.username
# json.avatar @user.avatar
json.channels do
	@user.channels.each do |channel|
		json.set! channel.id do
			json.id channel.id
			json.name channel.name
			json.private channel.private
			json.created_at channel.created_at
			json.updated_at channel.updated_at
		end
	end
end
json.default_channel_id @user.default_channel_id