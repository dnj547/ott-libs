class RecapSerializer < ActiveModel::Serializer
  attributes :id
  has_many :stories
  has_many :users, through: :stories
end
