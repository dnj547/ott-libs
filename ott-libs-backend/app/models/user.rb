class User < ApplicationRecord
  has_many :user_recaps
  has_many :recaps, through: :user_recaps
  has_many :stories, through: :recaps



end
