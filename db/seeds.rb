require "open-uri"
# user = User.find(67)
# file = open("https://quackit-dev.s3-us-west-1.amazonaws.com/scrooge.png")
# user.avatar.attach(io: file, filename: 'scrooge.png')

# # This file should contain all the record creation needed to seed the database with its default values.
# # The data can then be loaded with the rails db:seed command (or create!d alongside the database with db:setup).
# #
# # Examples:
# #
# #   movies = Movie.create!([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
# #   Character.create!(name: 'Luke', movie: movies.first)

User.destroy_all
Message.destroy_all
Channel.destroy_all

daffy = User.create!(username: "daffy", password: "123123", email: "daffy@warnerbrothers.com")
donald = User.create!(username: "donald", password: "123123", email: "donaldduck@disney.com")
daisy = User.create!(username: "daisy", password: "123123", email: "daisylovesdonald@disney.com")
scrooge = User.create!(username: "scroogemcduck", password: "123123", email: "scroogelovesmoney@disney.com")
mighty_duck = User.create!(username: "mightyduck", password: "123123", email: "hockeyduck@nhl.com")

lord_duck = User.create!(username: "lord_duck", password: "123123secret", email: "lord_duck@lake.com")
global = Channel.create!(owner_id: lord_duck.id, name: "global", private: false)

channel_1 = Channel.create!(owner_id: daffy.id, name: "best-flight-paths", private: false)
channel_2 = Channel.create!(owner_id: daisy.id, name: "migrations", private: false)
channel_3 = Channel.create!(owner_id: daffy.id, name: "duck-lyfe", private: false)

daffy.update_attribute(:default_channel_id, global.id)
donald.update_attribute(:default_channel_id,global.id)
daisy.update_attribute(:default_channel_id, global.id)
scrooge.update_attribute(:default_channel_id, global.id)
mighty_duck.update_attribute(:default_channel_id, global.id)

#daffy belongs to channel 1
#donald belong to channels 1, 2
#daisy belongs to channels 1, 2, 3
#scrooge belongs to channels 1, 2
#mighty_duck belongs to channels 2, 3

global.users << lord_duck
global.users << daffy
global.users << donald
global.users << daisy
global.users << scrooge
global.users << mighty_duck

channel_1.users << daffy
channel_1.users << daisy
channel_1.users << donald
channel_1.users << scrooge

channel_2.users << mighty_duck
channel_2.users << donald
channel_2.users << scrooge
channel_2.users << daisy

channel_3.users << mighty_duck
channel_3.users << daisy

Message.create!(content:"Message 1", 	channel_id: channel_1.id, sender_id: daffy.id)
Message.create!(content:"Message 14", 	channel_id: channel_1.id, sender_id: daisy.id)
Message.create!(content:"Message 6", 	channel_id: channel_1.id, sender_id: daisy.id)
Message.create!(content:"Message 8", 	channel_id: channel_1.id, sender_id: donald.id)
Message.create!(content:"Message 10", 	channel_id: channel_1.id, sender_id: scrooge.id)
Message.create!(content:"Message 12", 	channel_id: channel_1.id, sender_id: scrooge.id)

Message.create!(content:"Message 13", 	channel_id: channel_2.id, sender_id: mighty_duck.id)
Message.create!(content:"Message 2", 	channel_id: channel_2.id, sender_id: donald.id)
Message.create!(content:"Message 4", 	channel_id: channel_2.id, sender_id: scrooge.id)
Message.create!(content:"Message 7", 	channel_id: channel_2.id, sender_id: daisy.id)
Message.create!(content:"Message 9", 	channel_id: channel_2.id, sender_id: daisy.id)

Message.create!(content:"Message 11", 	channel_id: channel_3.id, sender_id: mighty_duck.id)
Message.create!(content:"Message 3", 	channel_id: channel_3.id, sender_id: daisy.id)
Message.create!(content:"Message 5", 	channel_id: channel_3.id, sender_id: mighty_duck.id)

