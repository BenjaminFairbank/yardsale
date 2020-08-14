class Api::V1::CommentMailer < ApplicationMailer
  default from: 'YardSaleNotifications@gmail.com'

  def comment_posted_email
    @commenter = params[:commenter]
    @new_comment = params[:new_comment]
    @item = params[:item]
    @item_owner = params[:item_owner]
    @url  = "http://y-s.herokuapp.com/items/#{@item.id}"
    mail(to: @item_owner.email, subject: "YardSale: #{@commenter.user_name} commented on #{@item.name}...")
  end
end
