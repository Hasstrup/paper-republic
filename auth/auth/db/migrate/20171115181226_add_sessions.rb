class AddSessions < ActiveRecord::Migration[5.1]
  def change
      create_table :sessions, :id => false do |t|
        t.integer :id, :limit => 8, primary_key: true
        t.string :username
  end
  end
end
