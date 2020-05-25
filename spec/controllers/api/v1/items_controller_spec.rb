require "rails_helper"

RSpec.describe Api::V1::ItemsController, type: :controller do

  describe "GET#index" do
    user1 = FactoryBot.create(:user)


    it "should not list posts if the user is not logged in" do
      get :index
      expect(response.status).to eq(302)
      expect(response).to redirect_to(new_user_session_path)
    end

    it "should allow user to view the list of items" do
      sign_in(user1)
      get :index
      expect(response.status).to eq 200
      expect(response.content_type).to eq ("application/json")
    end

  end
end
