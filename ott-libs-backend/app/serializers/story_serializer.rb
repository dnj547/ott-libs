class StorySerializer < ActiveModel::Serializer
  attributes :id, :words
  has_one :template
  has_many :recaps
  has_many :users, through: :recaps
end
