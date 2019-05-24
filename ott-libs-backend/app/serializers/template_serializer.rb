class TemplateSerializer < ActiveModel::Serializer
  attributes :id, :title, :sentences
  has_many :stories
end
