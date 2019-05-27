class Story < ApplicationRecord
  has_many :recap_stories
  has_many :recaps, through: :recap_stories
  has_many :users, through: :recaps
end
