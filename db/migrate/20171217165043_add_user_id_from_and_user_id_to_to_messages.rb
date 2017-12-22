class AddUserIdFromAndUserIdToToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :sender_id, :integer
    add_column :messages, :receiver_id, :integer
    remove_column :messages, :user_id, foreign_key: true
  end
end
