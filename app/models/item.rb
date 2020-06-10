class Item < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :name,          presence: true, length: { maximum: 20 }
  validates :description,   presence: true, length: { maximum: 200 }
  validates :asking_price,  presence: true, numericality: { only_integer: true, less_than_or_equal_to: 1000000000 }
  validates :zip_code,      presence: true


  mount_uploader :image, ImageUploader
  validates_presence_of :image
end
