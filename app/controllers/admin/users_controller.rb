class Admin::UsersController < ApplicationController

  before_action :authorize_user

  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def update
    user = User.find(params[:id])
    if !user.admin?
      user.update_attribute :role, "admin"
    else
      user.update_attribute :role, "member"
    end
    @users = User.all
    render :index
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
