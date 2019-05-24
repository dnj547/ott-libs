class StorySerializer < ActiveModel::Serializer
  attributes :id, :words
  has_one :template
  has_many :recap_stories
  has_many :recaps, through: :recap_stories
  has_many :users, through: :recaps
end
