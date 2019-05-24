class RecapStorySerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :recap
  belongs_to :story
end
