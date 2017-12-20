class RenameUserIdFromToSenderIdAndUserIdToToRecieverIdInMessages < ActiveRecord::Migration
  def change
    rename_column :messages,:user_id_from, :sender_id
    rename_column :messages,:user_id_to, :reciever_id
  end
end
