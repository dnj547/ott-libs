class Story < ApplicationRecord
  belongs_to :template
  has_many :recaps
  has_many :users, through: :recaps
end
