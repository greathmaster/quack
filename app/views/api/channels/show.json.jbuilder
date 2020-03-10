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
json.messages @messages