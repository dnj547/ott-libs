class StorySerializer < ActiveModel::Serializer
  attributes :id, :full_story, :user_id, :recap_id
  belongs_to :user
  belongs_to :recap
end
