class Api::V1::SpecialAccess::ItemsController < ApplicationController

  before_action :access_allowed

  def update
    item = Item.find(params[:id])

    if item_params["image"]
      item["image"] = item_params["image"]
    end

    if item.update(item_params)
      render json: {
        item: serialized_data(item, ItemSerializer)
      }
    else
      render json: {error: item.errors.full_messages.to_sentence}
    end
  end

  protected

  def serialized_data(data, serializer)
    ActiveModelSerializers::SerializableResource.new(data, each_serializer: serializer)
  end

  def access_allowed
    item = Item.find(params[:id])
    if !current_user.items.include?(item)
      render json: {
        item: serialized_data(item, ItemSerializer),
        error: "You are not allowed to edit this item!"
      }
    end
  end

  def item_params
    params.require(:item).permit(:name, :description, :image, :asking_price)
  end
end
