require "rails_helper"
require "support/render_views"

RSpec.describe Admin::ItemsController, type: :controller do

  describe "DELETE#destroy" do

    before(:example) do
      @user1 = FactoryBot.create(:user)
      @item1 = FactoryBot.create(:item)
    end

    it "should not delete the comment if the current user is not logged in" do
      prev_count = Item.count
      delete :destroy, params: {id: @item1.id}, format: :json
      expect(response.status).to eq(401)
      expect(JSON.parse(response.body)["error"]).to eq("")
      expect(Item.count).to eq(prev_count)
    end

    it "should not delete the comment if the current user is not an admin" do
      prev_count = Item.count
      sign_in(@user1)
      delete :destroy, params: {id: @item1.id}, format: :json
      expect(response.status).to eq(302)
      expect(flash[:notice]).to eq("You do not have access to this page.")
      expect(Item.count).to eq(prev_count)
    end

    it "should only delete the comment if the current user is an admin" do
      @user1.update_attribute("role", "admin")
      prev_count = Item.count
      sign_in(@user1)
      delete :destroy, params: {id: @item1.id}, format: :json
      expect(response.status).to eq(200)
      expect(Item.count).to eq(prev_count - 1)
    end
  end
end
