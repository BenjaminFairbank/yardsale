class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :user_name, presence: true, uniqueness: true
  validates :zip_code, presence: true
  validates :profile_photo, presence: true

  has_many :items
  has_many :comments

  mount_uploader :profile_photo, ProfilePhotoUploader
  validates_presence_of :profile_photo
end
