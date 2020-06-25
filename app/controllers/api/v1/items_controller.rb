class Api::V1::ItemsController < ApplicationController
  # before_action :authorize_user, except: [:index, :show]

  def index
    zip = current_user.zip_code
    url = "http://api.openweathermap.org/data/2.5/weather?q=#{zip},us&appid=#{ENV["OPEN_WEATHER_API_KEY"]}"
    api_response = Faraday.get(url)
    weather = JSON.parse(api_response.body)

    render json: {
      items: serialized_data(Item.all, ItemSerializer),
      current: serialized_data(current_user, UserSerializer),
      weather: weather
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

  def destroy
    item = Item.find(params[:id])
    user = item.user

    if user.id === current_user.id || current_user.admin?
      item.delete
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

  def authorize_user
    if !user_signed_in || !current_user.admin?
      flash[:notice] = "You do not have access to this page."
      redirect_to new_user_session_path
    end
  end
end
