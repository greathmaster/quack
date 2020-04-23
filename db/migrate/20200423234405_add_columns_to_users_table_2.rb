class AddColumnsToUsersTable2 < ActiveRecord::Migration[5.2]
	def change
	  add_column :users, :nickname, :string
	  add_column :users, :profession, :string
	end
  end
