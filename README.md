# README
Quack! is a single page clone of Slack built with Ruby on Rails, PostgreSQL, Action Cable Web Sockets, and React/Redux.

<p align="center">
<kbd><img src="images/Screenshot 2020-04-24 10.05.15.png" width=400></kbd><kbd><img src="images/Screenshot 2020-04-24 10.02.34.png" width=400></kbd>
</p>

## Overview of Live Chat
Quack! makes use of websockets through Rails Action Cable module. Standard HTTP connections only allow for a one way communication at any one time (known as half-duplex). A helpful anaology is using a radio or walkie-talkie, where only one person can talk at a time. The standard HTTP request can be upgraded to a web socket connection which is a full duplex connection. A full duplex connection enables full 2 way communction, analagous to a cell phone, where both parties can communicate at the same time.

The web sockets make use of a publisher-subscriber model, where users are subscribed to a channel. A user sends a message to the channel at large, and anyone subscribed to that channel will recieve it.

The core functionality of live chat resides in `app/controllers/api/messages_controller.rb` and `app/channels/channels_channel.rb`

When an incoming message is saved to the database in the `MessagesController`, it broadcasts to all the subscribers

From `app/controllers/api/messages_controller.rb`:
```
class Api::MessagesController < ApplicationController
	def create
		@message = Message.new(message_params)
		@channel = Channel.find_by_id(message_params[:channel_id])

		if @message.save
			ChannelsChannel.broadcast_to(@channel, {
				room: @channel.id,
				message_id: @message.id,
				message: @message.content,
				sender_id: @message.sender_id,
				created_at: @message.created_at,
				updated_at: @message.updated_at

			})
			render json: @message;
		else
			render json: @message.errors.full_messages, status: 422
		end
	end

	def message_params
		params.require(:message).permit(:content, :channel_id, :sender_id)
	end
end
```

The `ChannelsChannel` class handles the subscription and publishing (aka. broadcasting) functionality.

From `app/channels/channels_channel.rb`:
```
class ChannelsChannel < ApplicationCable::Channel
	def subscribed
		@room =  Channel.find_by_id(params[:room])
		stream_for @room
	end

	def received(data)
		ChannelsChannel.broadcast_to(@room, {channel: @room, users: @room.users, messages: @room.messages})
	end
  ....
```


## Additional Features
Quack! has a number of features simlar to it's inspiration Slack.

### Rich Text Editor
Quack! features a Rich Text editor built using Quill JS with font formats of Bold, Italic, and Underline. Also, a user can make bulleted or numbered lists.

<p align="center">
<kbd><img src="images/Screenshot 2020-04-24 09.56.58.png" width=500 ></kbd>
</p>

### Emojis 
Quack! integrates emojis since they are a fun part of using any chat applciation.
<p align="center">
<kbd><img src="images/Screenshot 2020-04-24 10.03.24.png" width=500></kbd>
</p>

### Channel Creation and Direct Messages
Quack! allows users to create their own channels and send direct messages to selected members.
<p align="center">
<kbd><img src="images/Screenshot 2020-04-24 10.00.11.png" width=500></kbd>
</p>

### Avatars and AWS Itegration
Avatars are stored on AWS to ensure rapid availability and efficient delivery. In addition, members can update their avatars through a modal update form.
<p align="center"
<kbd><img src="images/Screenshot 2020-04-24 09.49.15.png" width=500></kbd>
</p>
