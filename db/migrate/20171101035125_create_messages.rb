class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text :content
      t.references :user, foreign_key: true

      t.timestamps
    end
      add_index :messages, [:user_id, :created_at]
  end
end
