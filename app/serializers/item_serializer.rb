class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image, :asking_price, :area_code, :created_at, :updated_at, :user

  def user
    object.user
  end
end
