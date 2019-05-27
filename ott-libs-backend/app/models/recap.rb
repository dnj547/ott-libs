class Recap < ApplicationRecord
  has_many :stories
  has_many :users, through: :stories
end
