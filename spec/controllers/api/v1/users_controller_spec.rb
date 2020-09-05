require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do
  
  describe "GET#show" do

    before(:example) do
      @user1 = FactoryBot.create(:user)
      @user2 = FactoryBot.create(:user)
    end

    it "should not show the selected user if the browsing user is not logged in" do
      get :show, params: {id: @user2.id}

      expect(response.status).to eq(302)
      expect(response).to redirect_to(new_user_session_path)
    end

    it "should show the selected user if the browsing user is logged in" do
      sign_in(@user1)
      get :show, params: {id: @user2.id}

      expect(response.status).to eq 200
      expect(response.content_type).to eq ("application/json")
    end

    it "returns the selected users information" do
      sign_in(@user1)
      get :show, params: {id: @user2.id}

      returned_json = JSON.parse(response.body)

      expect(returned_json["target"]["id"]).to eq(@user2.id)
      expect(returned_json["target"]["user_name"]).to eq(@user2.user_name)
      expect(returned_json["target"]["email"]).to eq(@user2.email)
      expect(returned_json["target"]["zip_code"]).to eq(@user2.zip_code)
      expect(returned_json["target"]["blurb"]).to eq(@user2.blurb)
    end

    it "returns the browsing users information" do
      sign_in(@user1)
      get :show, params: {id: @user2.id}

      returned_json = JSON.parse(response.body)

      expect(returned_json["current"]["id"]).to eq(@user1.id)
      expect(returned_json["current"]["user_name"]).to eq(@user1.user_name)
      expect(returned_json["current"]["email"]).to eq(@user1.email)
      expect(returned_json["current"]["zip_code"]).to eq(@user1.zip_code)
      expect(returned_json["current"]["blurb"]).to eq(@user1.blurb)
    end
  end
end
