# Preview all emails at http://localhost:3000/rails/mailers/api/v1/comment_mailer
class Api::V1::CommentMailerPreview < ActionMailer::Preview
  def comment_posted_email
    Api::V1::CommentMailer.with(
      commenter: User.first,
      new_comment: Comment.first.body,
      item: Item.first,
      item_owner: User.last
    ).comment_posted_email
  end
end
