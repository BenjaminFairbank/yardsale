require "rails_helper"

RSpec.describe Api::V1::CommentsController, type: :controller do

  describe "GET#index" do

    before(:example) do
      @user1 = FactoryBot.create(:user)
      item1 = FactoryBot.create(:item)
      @comment1 = FactoryBot.create(:comment)
      @comment2 = FactoryBot.create(:comment)
      @comment3 = FactoryBot.create(:comment)
      item1.comments << @comment1
      item1.comments << @comment2
      item1.comments << @comment3
      @item1 = item1
    end

    it "should not show comments if the user is not logged in" do
      get :index
      expect(response.status).to eq(302)
      expect(response).to redirect_to(new_user_session_path)
    end

    it "should allow signed in user to view the list of comments" do
      sign_in(@user1)
      get :index, params: {item_id: @item1.id}

      expect(response.status).to eq 200
      expect(response.content_type).to eq ("application/json")
    end

    it "returns all comments in the database" do
      sign_in(@user1)
      get :index, params: {item_id: @item1.id}

      returned_json = JSON.parse(response.body)

      expect(returned_json.length).to eq 3
      expect(returned_json[0]["body"]).to eq @comment1.body
      expect(returned_json[1]["body"]).to eq @comment2.body
      expect(returned_json[2]["body"]).to eq @comment3.body
    end

  end

  describe "POST#create" do

    before(:example) do
      user1 = FactoryBot.create(:user)
      @item1 = FactoryBot.create(:item)
      user1.items << @item1
      @user1 = user1
      @post_json = {
        comment: {
          body: "I'm a robot.",
          user_id: @user1.id,
          item_id: @item1.id
        }
      }
    end

    it "should not post a comment if the user is not logged in" do

      post :create, params: @post_json, format: :json
      expect(response.status).to eq(401)
      expect(JSON.parse(response.body)["error"]).to eq("")
    end

    it "persists a new comment upon successful completion of the form" do

      prev_count = Comment.count

      sign_in(@user1)
      post :create, params: @post_json, format: :json
      expect(Comment.count).to eq(prev_count + 1)
    end

    it "returns the newly persisted comment in json format" do
      sign_in(@user1)
      post :create, params: @post_json
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["body"]).to eq "I'm a robot."
    end

    it "gives errors when the fields are incorrectly filled in" do
      post_json = {
        comment: {
          body: "",
          user_id: @user1.id,
          item_id: @item1.id
        }
      }

      prev_count = Comment.count
      sign_in(@user1)
      post(:create, params: post_json)
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Body can't be blank"
      expect(Comment.count).to eq(prev_count)
    end
  end

  describe "DELETE#destroy" do

    before(:example) do
      user1 = FactoryBot.create(:user)
      user2 = FactoryBot.create(:user)
      item1 = FactoryBot.create(:item)
      @comment = FactoryBot.create(:comment)
      item1.comments << @comment
      user1.items << item1
      @user1 = user1
      @user2 = user2
      @item1 = item1
    end

    it "should not delete the comment if the user is not logged in" do
      delete :destroy, params: {id: @comment.id}, format: :json
      expect(response.status).to eq(401)
      expect(JSON.parse(response.body)["error"]).to eq("")
    end

    it "should deletes the the comment if the current user is the author" do
      sign_in(@user1)
      prev_count = Comment.count
      delete :destroy, params: {id: @comment.id}, format: :json
      expect(Comment.count).to eq(prev_count - 1)
    end

    it "should not delete the comment if the current user is not the author" do
      sign_in(@user2)
      delete :destroy, params: {id: @comment.id}, format: :json
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)["error"]).to eq("You are not authorized to delete this comment!")
    end

    it "should delete the comment if the current user is an admin" do
      @user2.update_attribute("role", "admin")
      prev_count = Comment.count
      sign_in(@user2)
      delete :destroy, params: {id: @comment.id}, format: :json
      expect(response.status).to eq(200)
      expect(Comment.count).to eq(prev_count - 1)
    end

    it "should allow the item's owner to delete comments on their item" do
      user3 = FactoryBot.create(:user)
      user4 = FactoryBot.create(:user)
      item3 = FactoryBot.create(:item)
      comment4 = FactoryBot.create(:comment)
      item3.user = user3
      comment4.user = user4
      item3.comments << comment4
      user3.items << item3
      @user3 = user3
      @comment4 = comment4

      prev_count = Comment.count

      sign_in(@user3)
      delete :destroy, params: {id: @comment4.id}, format: :json
      expect(response.status).to eq 200
      expect(Comment.count).to eq(prev_count - 1)
    end

    it "returns an updated list of the items comments" do
      prev_count = @item1.comments.length

      sign_in(@user1)
      delete :destroy, params: {id: @comment.id}, format: :json

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq(prev_count - 1)
    end
  end
end
