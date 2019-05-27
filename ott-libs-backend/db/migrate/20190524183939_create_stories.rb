class CreateStories < ActiveRecord::Migration[5.2]
  def change
    create_table :stories do |t|
      t.string :full_story

      t.timestamps
    end
  end
end
