json.id @channel.id
json.name @channel.name
json.owner_id @channel.owner_id
json.private @channel.private
# json.users @channel.users
# json.users @channel.users do |user|
# 	json.id user.id.to_s do 
# 		json.id user.id
# 		json.username user.username
# 	end
#   end
json.users do
@channel.users.each do |user|
	json.set! user.id do
	 json.id user.id
	 json.username user.username
	end
end
end

json.messages do
	@messages.each do |message|
		json.set! message.id do
			json.id message.id
			json.content message.content
			json.sender_id message.sender_id
			json.avatar message.user.avatar.attached? ? url_for(message.user.avatar) : nil
			json.channel_id message.channel_id
			json.created_at message.created_at
			json.updated_at message.updated_at
		end
	end
end