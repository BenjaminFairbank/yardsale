class AdminsController < ApplicationController

  before_action :authenticate_user!, :authorize_user

  def index
  end

  private

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      flash[:notice] = "You do not have access to this page."
      redirect_to items_path
    end
  end
end
