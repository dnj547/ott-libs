class CreateStories < ActiveRecord::Migration[5.2]
  def change
    create_table :stories do |t|
      t.belongs_to :template, foreign_key: true
      t.string :words

      t.timestamps
    end
  end
end
