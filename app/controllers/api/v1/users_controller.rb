class Api::V1::UsersController < ApplicationController

  def show

    render json: { target: User.find(params[:id]), current: current_user }
  end

end
