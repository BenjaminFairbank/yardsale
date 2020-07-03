class UsersController < ApplicationController

  before_action :authenticate_user!, :authorize_user

  def index
    get_users
    render :index
  end

  def destroy
    user = User.find(params[:id])
    user.delete
    get_users
    render :index
  end

  private

  def get_users
    @Users = User.all
  end

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      flash[:notice] = "You do not have access to this page."
      redirect_to items_path
    end
  end
end
