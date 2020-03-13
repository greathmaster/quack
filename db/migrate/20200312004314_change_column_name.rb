class ChangeColumnName < ActiveRecord::Migration[5.2]
  def change
	rename_column :users, :last_channel_id, :default_channel_id
  end
end
