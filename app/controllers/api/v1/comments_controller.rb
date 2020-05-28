class Api::V1::CommentsController < ApplicationController
  # before_action :authorize_user, except: [:index, :show]

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

  protected

  def comment_params
    params.require(:comment).permit(:body, :user_id, :item_id)
  end

  def authorize_user
    if !user_signed_in || !current_user.admin?
      flash[:notice] = "You do not have access to this page."
      redirect_to new_user_session_path
    end
  end
end
