class StorySerializer < ActiveModel::Serializer
  attributes :id, :full_story, :user_id, :recap
  belongs_to :user
end
