class Api::V1::CommentsController < ApplicationController

  def index
    item = Item.find(params[:item_id])
    render json: item.comments
  end

  def create
    item = Item.find(params[:item_id])
    comment = Comment.new(comment_params)
    comment.user = current_user
    comment.item = item

    if comment.save
      render json: comment
    else
      render json: {error: comment.errors.full_messages.to_sentence}
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    item = comment.item
    comment.delete
    render json: item.comments
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
