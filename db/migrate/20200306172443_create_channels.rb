class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string :name
      t.integer :owner_id
      t.boolean :private

      t.timestamps
    end
  end
end
