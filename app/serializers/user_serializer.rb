class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :user_name, :blurb, :zip_code, :profile_photo, :items, :role

  def items
    object.items
  end
end
