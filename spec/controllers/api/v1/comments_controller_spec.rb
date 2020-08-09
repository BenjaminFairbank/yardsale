require "rails_helper"

RSpec.describe Api::V1::CommentsController, type: :controller do

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
      item1 = FactoryBot.create(:item)
      @comment = FactoryBot.create(:comment)
      item1.comments << @comment
      user1.items << item1
      @user1 = user1
      @item1 = item1
    end

    it "should not delete the item if the user is not logged in" do
      delete :destroy, params: {id: @comment.id}, format: :json
      expect(response.status).to eq(401)
      expect(JSON.parse(response.body)["error"]).to eq("")
    end

    it "deletes the the item" do
      sign_in(@user1)
      prev_count = Comment.count
      delete :destroy, params: {id: @comment.id}, format: :json
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
