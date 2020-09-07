require "rails_helper"
require "support/render_views"

RSpec.describe Admin::CommentsController, type: :controller do

    describe "DELETE#destroy" do

      before(:example) do
        user1 = FactoryBot.create(:user)
        item1 = FactoryBot.create(:item)
        @comment1 = FactoryBot.create(:comment)
        item1.comments << @comment1
        user1.items << item1
        @user1 = user1
        @item1 = item1
      end

      it "should not delete the comment if the current user is not logged in" do
        prev_count = Comment.count
        delete :destroy, params: {id: @comment1.id}, format: :json
        expect(response.status).to eq(401)
        expect(JSON.parse(response.body)["error"]).to eq("")
        expect(Comment.count).to eq(prev_count)
      end

      it "should not delete the comment if the current user is not an admin" do
        prev_count = Comment.count
        sign_in(@user1)
        delete :destroy, params: {id: @comment1.id}, format: :json
        expect(response.status).to eq(302)
        expect(flash[:notice]).to eq("You do not have access to this page.")
        expect(Comment.count).to eq(prev_count)
      end

      it "should only delete the comment if the current user is an admin" do
        @user1.update_attribute("role", "admin")
        prev_count = Comment.count
        sign_in(@user1)
        delete :destroy, params: {id: @comment1.id}, format: :json
        expect(response.status).to eq(200)
        expect(Comment.count).to eq(prev_count - 1)
      end

    end

end
