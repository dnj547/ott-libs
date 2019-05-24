class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  # has_many :recaps
  # has_many :stories, through: :recaps
end
