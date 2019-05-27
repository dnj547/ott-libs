class User < ApplicationRecord
  has_many :stories
  has_many :recaps, through: :stories
end
