class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id, :item_id, :created_at, :updated_at, :user, :item

  def user
    object.user
  end

  def item
    object.item
  end
end
