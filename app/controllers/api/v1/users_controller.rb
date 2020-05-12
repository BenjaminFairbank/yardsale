class Api::V1::UsersController < ApplicationController

  def show
    render json: { target: serializer_target_user, current: serializer_current_user }
  end

  binding.pry

  def serializer_target_user
    ActiveModelSerializers::SerializableResource.new(User.find(params[:id]), UserSerializer)
  end

  def serializer_current_user
    ActiveModelSerializers::SerializableResource.new(current_user, CurrentUserSerializer)
  end
end
