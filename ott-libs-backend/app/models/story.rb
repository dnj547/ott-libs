class Story < ApplicationRecord
  belongs_to :template
  has_many :recap_stories
  has_many :recaps, through: :recap_stories
  has_many :users, through: :recaps

end
