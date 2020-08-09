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

      expect(returned_json["weather"]).to have_key("name")
      expect(returned_json["weather"]["sys"]).to have_key("country")
      expect(returned_json["weather"]["weather"][0]).to have_key("description")
      expect(returned_json["weather"]["main"]).to have_key("temp")
      expect(returned_json["weather"]["main"]).to have_key("humidity")
      expect(returned_json["weather"]["wind"]).to have_key("speed")
      expect(returned_json["weather"]["wind"]).to have_key("deg")
      expect(returned_json["weather"]["clouds"]).to have_key("all")
    end
  end


  describe "GET#show" do

    before(:example) do
      @user = FactoryBot.create(:user)
      @item = FactoryBot.create(:item_with_comments)
    end

    it "should not show the item if the user is not logged in" do
      get :show, params: {id: @item.id}
      expect(response.status).to eq(302)
      expect(response).to redirect_to(new_user_session_path)
    end

    it "should allow signed in user to view the list of items" do
      sign_in(@user)
      get :show, params: {id: @item.id}

      expect(response.status).to eq 200
      expect(response.content_type).to eq ("application/json")
    end

    it "returns the item" do
      sign_in(@user)
      get :show, params: {id: @item.id}

      returned_json = JSON.parse(response.body)

      expect(returned_json["item"]["name"]).to eq @item.name
      expect(returned_json["item"]["description"]).to eq @item.description
      expect(returned_json["item"]["asking_price"]).to eq @item.asking_price
    end

    it "returns the current user" do
      sign_in(@user)
      get :show, params: {id: @item.id}

      returned_json = JSON.parse(response.body)

      expect(returned_json["current"]["email"]).to eq @user.email
      expect(returned_json["current"]["user_name"]).to eq @user.user_name
      expect(returned_json["current"]["zip_code"]).to eq @user.zip_code
      expect(returned_json["current"]["email"]).to eq @user.email
    end

    it "returns the item's comments" do
      sign_in(@user)
      get :show, params: {id: @item.id}

      returned_json = JSON.parse(response.body)

      expect(returned_json["comments"].length).to eq 5
    end
  end

  describe "POST#create" do

    before(:example) do
      @user = FactoryBot.create(:user)

      @post_json = {
        item: {
          name: "I'm a robot.",
          description: "This is the most boring description I have ever wrote but It's almost just about long enought to simulate the real thing.  There we go.",
          asking_price: 5000,
          image: Rack::Test::UploadedFile.new(Rails.root.join('spec/support/images/photo.png'), 'image/png'),
        }
      }
    end

    it "should not create the item if the user is not logged in" do

      post :create, params: @post_json, format: :json
      expect(response.status).to eq(401)
      expect(JSON.parse(response.body)["error"]).to eq("")
    end

    it "persists a new item upon successful completion of the form" do

      prev_count = Item.count

      sign_in(@user)
      post :create, params: @post_json, format: :json
      expect(Item.count).to eq(prev_count + 1)
    end

    it "returns the newly persisted item in json format" do
      sign_in(@user)
      post :create, params: @post_json
      returned_json = JSON.parse(response.body)

      item_id = returned_json["id"]

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")


      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["name"]).to eq "I'm a robot."
      expect(returned_json["description"]).to eq "This is the most boring description I have ever wrote but It's almost just about long enought to simulate the real thing.  There we go."
      expect(returned_json["asking_price"]).to eq 5000
      expect(returned_json["image"]["url"]).to eq "/uploads/item/image/#{item_id}/photo.png"
    end

    it "gives errors when the fields are incorrectly filled in" do
      post_json = {
        item: {
          name: "",
          description: "",
          asking_price: "",
          image: ""
        }
      }

      prev_count = Item.count
      sign_in(@user)
      post(:create, params: post_json)
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Name can't be blank, Description can't be blank, Asking price can't be blank, Asking price is not a number, and Image can't be blank"
      expect(Item.count).to eq(prev_count)
    end
  end

  describe "DELETE#destroy" do

    before(:example) do
      user = FactoryBot.create(:user)
      @item = FactoryBot.create(:item)
      user.items << @item
      @user = user
    end

    it "should not delete the item if the user is not logged in" do
      delete :destroy, params: {id: @item.id}, format: :json
      expect(response.status).to eq(401)
      expect(JSON.parse(response.body)["error"]).to eq("")
    end

    it "deletes the the item" do
      sign_in(@user)
      prev_count = Item.count
      delete :destroy, params: {id: @item.id}, format: :json
      expect(Item.count).to eq(prev_count - 1)
    end

    it "returns an updated list of the users items" do
      prev_count = @user.items.length

      sign_in(@user)
      delete :destroy, params: {id: @item.id}, format: :json

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq(prev_count - 1)
    end
  end
end
