class CreateRecaps < ActiveRecord::Migration[5.2]
  def change
    create_table :recaps do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :story, foreign_key: true
      t.integer :save_slot

      t.timestamps
    end
  end
end
