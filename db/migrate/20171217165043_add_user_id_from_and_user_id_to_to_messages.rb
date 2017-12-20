class AddUserIdFromAndUserIdToToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :user_id_from, :integer
    add_column :messages, :user_id_to, :integer
    remove_column :messages, :user_id, foreign_key: true
  end
end
