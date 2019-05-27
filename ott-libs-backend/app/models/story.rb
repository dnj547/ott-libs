class Story < ApplicationRecord
  belongs_to :user
  belongs_to :recap
end
