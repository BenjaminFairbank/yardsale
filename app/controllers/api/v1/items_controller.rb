class Api::V1::ItemsController < ApplicationController

  def index
    render json: Item.all
  end

  def show
    render json: Item.find(params[:id])
  end

  def create
    item = Item.new(item_params)
    if !current_user.nil?
      item.user = current_user
      item.zip_code = current_user.zip_code
    end

    if item.save
      render json: item
    else
      render json: {error: review.errors.full_messages.to_sentence}
    end
  end

  def destroy
    item = Item.find(params[:id])
    user = item.user
    item.delete
    render json: user
  end

  private

  def item_params
    params.require(:item).permit(:name, :description, :image, :asking_price)
  end

end
