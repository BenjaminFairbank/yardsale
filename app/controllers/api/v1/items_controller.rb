class Api::V1::ItemsController < ApplicationController

  def index
    render json: {
      items: serialized_data(Item.all, ItemSerializer),
      current: serialized_data(current_user, UserSerializer),
      weather: get_api_data()
    }
  end

  def show
    item = Item.find(params[:id])

    render json: {
      item: serialized_data(item, ItemSerializer),
      current: serialized_data(current_user, UserSerializer),
      comments: serialized_data(item.comments, CommentSerializer)
    }
  end

  def create
    item = Item.new(item_params)
    item.user = current_user
    item.zip_code = current_user.zip_code
    item["image"] = item_params["image"]

    if item.save
      render json: item
    else
      render json: {error: item.errors.full_messages.to_sentence}
    end
  end

  def update
    item = Item.find(params[:id])
    user = item.user

    if user.id != current_user.id
      render json: {
        item: serialized_data(item, ItemSerializer),
        error: "You are not allowed to edit this item!"
      }
    else
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
  end

  def destroy
    item = Item.find(params[:id])
    user = item.user

    if user.id == current_user.id || current_user.admin?
      item.destroy
      render json: user.items
    else
      render json: {error: "You are not authorized to delete this item!"}
    end
  end

  protected

  def serialized_data(data, serializer)
    ActiveModelSerializers::SerializableResource.new(data, each_serializer: serializer)
  end

  def item_params
    params.require(:item).permit(:name, :description, :image, :asking_price)
  end

  def get_api_data
    zip = current_user.zip_code
    key = ENV["OPEN_WEATHER_API_KEY"]
    url = "http://api.openweathermap.org/data/2.5/weather?q=#{zip},us&appid=#{key}"
    api_response = Faraday.get(url)
    JSON.parse(api_response.body)
  end
end
