class Admin::ItemsController < ApplicationController

  before_action :authorize_user

  def destroy
    item = Item.find(params[:id])
    @user = item.user
    item.delete
    render "admin/users/show"
  end

  private

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      flash[:notice] = "You do not have access to this page."
      redirect_to items_path
    end
  end
end
