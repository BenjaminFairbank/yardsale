class Item < ApplicationRecord
  belongs_to :user
  has_many :comments

  validates :name,          presence: true, length: {maximum: 30}
  validates :description,   presence: true
  validates :asking_price,  presence: true
  validates :zip_code,      presence: true


  mount_uploader :image, ImageUploader
end
