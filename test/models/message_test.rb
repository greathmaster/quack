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
require 'test_helper'

class MessageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
