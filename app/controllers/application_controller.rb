class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery unless: -> { request.format.json? }
  # protect_from_forgery with: :null_session

  before_action :configure_permitted_parameters, if: :devise_controller?

  before_action :authenticate_user!

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:user_name, :blurb, :zip_code, :profile_photo, :profile_photo_cache])
    devise_parameter_sanitizer.permit(:account_update, keys: [:user_name, :blurb, :zip_code, :profile_photo, :profile_photo_cache])
  end
end
