class User < ApplicationRecord
  has_many :recaps
  has_many :stories, through: :recaps
end
