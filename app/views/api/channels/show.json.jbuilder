json.id @channel.id
json.name @channel.name
json.owner_id @channel.owner_id
json.private @channel.private

json.users do
@channel.users.each do |user|
	json.set! user.id do
	 json.id user.id
	 json.username user.username
	 json.nickname user.nickname
	 json.profession user.profession
	 json.avatar user.avatar.attached? ? url_for(user.avatar) : nil
	end
end
end

json.messages do
	@messages.each do |message|
		json.set! message.id do
			json.id message.id
			json.content message.content
			json.sender_id message.sender_id
			json.channel_id message.channel_id
			json.created_at message.created_at
			json.updated_at message.updated_at
		end
	end
end