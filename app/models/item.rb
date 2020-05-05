class Item < ApplicationRecord
  belongs_to :user

  validates :name,          presence: true
  validates :description,   presence: true
  validates :image,         presence: true
  validates :asking_price,  presence: true
  validates :zip_code,     presence: true
end
