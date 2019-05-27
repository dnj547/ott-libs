class StorySerializer < ActiveModel::Serializer
  attributes :id, :full_story
  has_many :recap_stories
  has_many :recaps, through: :recap_stories
  has_many :users, through: :recaps
end
