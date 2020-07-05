class Admin::UsersController < ApplicationController

  before_action :authenticate_user!, :authorize_user

  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def destroy
    user = User.find(params[:id])
    user.delete
    @users = User.all
    render :index
  end

  private

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      flash[:notice] = "You do not have access to this page."
      redirect_to items_path
    end
  end
end
