class TemplateSerializer < ActiveModel::Serializer
  attributes :id, :title, :body
  has_many :stories
end
