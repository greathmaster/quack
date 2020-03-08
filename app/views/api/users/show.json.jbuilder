# json.partial! "api/users/user", user: @user
# json.user do
# 	:id @user.id
# 	:username @user.username
# 	# json.channels @user.channels
# end
# json.extract! @user, :id, :username

json.id @user.id
json.username @user.username
json.channels @user.channels
json.last_channel_id @user.last_channel_id
