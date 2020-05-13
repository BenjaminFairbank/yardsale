class Api::V1::UsersController < ApplicationController

  def show
    render json: {
      target: serialized_data(User.find(params[:id]), UserSerializer),
      current: serialized_data(current_user, UserSerializer),
    }
  end

  private

  def serialized_data(data, serializer)
    ActiveModelSerializers::SerializableResource.new(data, each_serializer: serializer)
  end

end
