class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :user_recaps
  has_many :recaps, through: :user_recaps
  has_many :stories, through: :recaps
end
