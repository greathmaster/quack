class UsersChannels < ActiveRecord::Migration[5.2]
	def change
		create_table :channels_users, id: false do |t|
			t.belongs_to :user
			t.belongs_to :channel
		  end
	end
end