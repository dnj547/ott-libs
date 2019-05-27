class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :stories
  has_many :recaps, through: :stories
end
