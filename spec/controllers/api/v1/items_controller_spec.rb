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

    it "should allow user to view the list of items" do
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

  end
end
