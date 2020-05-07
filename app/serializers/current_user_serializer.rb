class CurrentUserSerializer < ActiveModel::Serializer
  attributes :id, :email, :user_name, :zip_code, :items

  def items
    object.items
  end
end
