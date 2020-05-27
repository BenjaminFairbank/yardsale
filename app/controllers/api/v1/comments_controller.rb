class Api::V1::CommentsController < ApplicationController

  def index
    item = Item.find(params[:item_id])
    render json: item.comments
  end

  def create
    comment = Comment.new(comment_params)
    
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
    params.require(:comment).permit(:body, :user_id, :item_id)
  end
end
