class RecapSerializer < ActiveModel::Serializer
  attributes :id, :save_slot
  has_one :user
  has_one :story
end
