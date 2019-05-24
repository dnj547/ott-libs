class CreateRecaps < ActiveRecord::Migration[5.2]
  def change
    create_table :recaps do |t|

      t.timestamps
    end
  end
end
