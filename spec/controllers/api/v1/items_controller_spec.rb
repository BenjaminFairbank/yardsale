require "rails_helper"

RSpec.describe Api::V1::ItemsController, type: :controller do

  describe "GET#index" do
    before(:example) do
      @user = FactoryBot.create(:user)
      @item1 = FactoryBot.create(:item)
      @item2 = FactoryBot.create(:item)
      @item3 = FactoryBot.create(:item)
    end

    it "should not list items if the user is not logged in" do
      get :index
      expect(response.status).to eq(302)
      expect(response).to redirect_to(new_user_session_path)
    end

    it "should allow signed in user to view the list of items" do
      sign_in(@user)
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq ("application/json")
    end

    it "returns all items in the database" do
      sign_in(@user)
      get :index

      returned_json = JSON.parse(response.body)

      expect(returned_json["items"].length).to eq 3
      expect(returned_json["items"][0]["name"]).to eq @item1.name
      expect(returned_json["items"][1]["name"]).to eq @item2.name
      expect(returned_json["items"][2]["name"]).to eq @item3.name
    end

    it "returns the current user" do
      sign_in(@user)
      get :index

      returned_json = JSON.parse(response.body)

      expect(returned_json["current"]["email"]).to eq @user.email
      expect(returned_json["current"]["user_name"]).to eq @user.user_name
      expect(returned_json["current"]["zip_code"]).to eq @user.zip_code
      expect(returned_json["current"]["email"]).to eq @user.email
    end

    it "returns weather data" do
      sign_in(@user)
      get :index

      returned_json = JSON.parse(response.body)

      expect(returned_json["weather"].length).to eq 13
      expect(returned_json["weather"]["name"]).to eq "Boston"
      expect(returned_json["weather"]["sys"]["country"]).to eq "US"
    end
  end


  describe "GET#show" do

    before(:example) do
      @user1 = FactoryBot.create(:user)
      @item1 = FactoryBot.create(:item_with_comments)
    end

    it "should not show the item if the user is not logged in" do
      get :show, params: {id: @item1.id}
      expect(response.status).to eq(302)
      expect(response).to redirect_to(new_user_session_path)
    end

    it "should allow signed in user to view the list of items" do
      sign_in(@user1)
      get :show, params: {id: @item1.id}

      expect(response.status).to eq 200
      expect(response.content_type).to eq ("application/json")
    end

    it "returns the item" do
      sign_in(@user1)
      get :show, params: {id: @item1.id}

      returned_json = JSON.parse(response.body)

      expect(returned_json["item"]["name"]).to eq @item1.name
      expect(returned_json["item"]["description"]).to eq @item1.description
      expect(returned_json["item"]["asking_price"]).to eq @item1.asking_price
    end

    it "returns the current user" do
      sign_in(@user1)
      get :show, params: {id: @item1.id}

      returned_json = JSON.parse(response.body)

      expect(returned_json["current"]["email"]).to eq @user1.email
      expect(returned_json["current"]["user_name"]).to eq @user1.user_name
      expect(returned_json["current"]["zip_code"]).to eq @user1.zip_code
      expect(returned_json["current"]["email"]).to eq @user1.email
    end

    it "returns the item's comments" do
      sign_in(@user1)
      get :show, params: {id: @item1.id}

      returned_json = JSON.parse(response.body)

      expect(returned_json["comments"].length).to eq 5
    end
  end
end
