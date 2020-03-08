class AddColumnsToUsersTable < ActiveRecord::Migration[5.2]
  def change
	add_column :users, :email, :string
	add_column :users, :last_channel_id, :integer, :default => 0
  end
end
