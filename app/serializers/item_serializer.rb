class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image, :asking_price, :zip_code, :created_at, :updated_at, :user, :comments

  def user
    object.user
  end

  def comments
    object.comments
  end
end
