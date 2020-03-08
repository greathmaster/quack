# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  content    :string
#  channel_id :integer
#  sender_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord
	belongs_to :channel
	belongs_to :user,
	foreign_key: :sender_id,
	class_name: "User"
end
