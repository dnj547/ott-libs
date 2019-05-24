class RecapSerializer < ActiveModel::Serializer
  attributes :id
  has_many :recap_stories
  has_many :user_recaps
  has_many :users, through: :user_recaps
  has_many :stories, through: :recap_stories
end
