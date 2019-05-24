class CreateRecapStories < ActiveRecord::Migration[5.2]
  def change
    create_table :recap_stories do |t|
      t.belongs_to :recap, foreign_key: true
      t.belongs_to :story, foreign_key: true
      t.timestamps
    end
  end
end
