require "rails_helper"

RSpec.describe Admin::UsersController, type: :controller do

  describe "GET#index" do

    before(:example) do
      @user = FactoryBot.create(:user)
      @user.update_attribute("role", "admin")
      @user1 = FactoryBot.create(:user)
      @user2 = FactoryBot.create(:user)
      @user3 = FactoryBot.create(:user)
    end

    it "should not render the template if the current user is not logged in" do
      get :index
      expect(response.status).to eq(302)
      expect(flash[:alert]).to eq("")
      expect(response).to redirect_to(new_user_session_path)
      expect(response).not_to render_template(:index)
    end

    it "should not render the template if the current user is not an admin" do
      sign_in(@user1)
      get :index
      expect(response.status).to eq(302)
      expect(flash[:notice]).to eq("You do not have access to this page.")
      expect(response).not_to render_template(:index)
    end

    it "should render the template if the current user is an admin" do
      sign_in(@user)
      get :index
      expect(response.status).to eq(200)
      expect(response.content_type).to eq ("text/html")
      expect(response).to render_template(:index)
    end

    it "should provide a list of all the users" do
      sign_in(@user)
      get :index
      expect(assigns(:users)).to eq(User.all)
    end
  end

  describe "GET#show" do

    before(:example) do
      @user = FactoryBot.create(:user)
      @user.update_attribute("role", "admin")
      @user1 = FactoryBot.create(:user)
    end

    it "should not render the template if the current user is not logged in" do
      get :show, params: {id: @user1.id}
      expect(response.status).to eq(302)
      expect(flash[:alert]).to eq("")
      expect(response).to redirect_to(new_user_session_path)
      expect(response).not_to render_template(:show)
    end

    it "should not render the template if the current user is not an admin" do
      sign_in(@user1)
      get :show, params: {id: @user1.id}
      expect(response.status).to eq(302)
      expect(flash[:notice]).to eq("You do not have access to this page.")
      expect(response).not_to render_template(:show)
    end

    it "should render the template if the current user is an admin" do
      sign_in(@user)
      get :show, params: {id: @user1.id}
      expect(response.status).to eq(200)
      expect(response.content_type).to eq ("text/html")
      expect(response).to render_template(:show)
    end

    it "should provide the target user's information" do
      sign_in(@user)
      get :show, params: {id: @user1.id}
      expect(assigns(:user)).to eq(User.find(@user1.id))
    end
  end

  describe "PATCH#update" do

    before(:example) do
      @user = FactoryBot.create(:user)
      @user.update_attribute("role", "admin")
      @user1 = FactoryBot.create(:user)
      @user1.update_attribute("role", "admin")
      @user2 = FactoryBot.create(:user)
    end

    it "should not render the template if the current user is not logged in" do
      patch :update, params: {id: @user2.id}
      expect(response.status).to eq(302)
      expect(flash[:alert]).to eq("")
      expect(response).to redirect_to(new_user_session_path)
      expect(response).not_to render_template(:index)
    end

    it "should not render the template if the current user is not an admin" do
      sign_in(@user2)
      patch :update, params: {id: @user2.id}
      expect(response.status).to eq(302)
      expect(flash[:notice]).to eq("You do not have access to this page.")
      expect(response).not_to render_template(:index)
    end

    it "should render the template if the current user is an admin" do
      sign_in(@user)
      patch :update, params: {id: @user2.id}
      expect(response.status).to eq(200)
      expect(response.content_type).to eq ("text/html")
      expect(response).to render_template(:index)
    end

    it "should make the user an admin if they are not already" do
      sign_in(@user)
      patch :update, params: {id: @user2.id}
      expect(User.find(@user2.id).role).to eq("admin")
    end

    it "should make the user a member if they are already an admin" do
      sign_in(@user)
      patch :update, params: {id: @user1.id}
      expect(User.find(@user1.id).role).to eq("member")
    end

    it "should provide an updated list of all the users" do
      sign_in(@user)
      patch :update, params: {id: @user2.id}
      expect(assigns(:users)).to eq(User.all)
    end
  end

  describe "DELETE#destroy" do

    before(:example) do
      @user = FactoryBot.create(:user)
      @user.update_attribute("role", "admin")
      @user1 = FactoryBot.create(:user)
      @user2 = FactoryBot.create(:user)
    end

    it "should not render the template if the current user is not logged in" do
      delete :destroy, params: {id: @user2.id}
      expect(response.status).to eq(302)
      expect(flash[:alert]).to eq("")
      expect(response).to redirect_to(new_user_session_path)
      expect(response).not_to render_template(:index)
    end

    it "should not render the template if the current user is not an admin" do
      sign_in(@user1)
      delete :destroy, params: {id: @user2.id}
      expect(response.status).to eq(302)
      expect(flash[:notice]).to eq("You do not have access to this page.")
      expect(response).not_to render_template(:index)
    end

    it "should render the template if the current user is an admin" do
      sign_in(@user)
      delete :destroy, params: {id: @user2.id}
      expect(response.status).to eq(200)
      expect(response.content_type).to eq ("text/html")
      expect(response).to render_template(:index)
    end

    it "should delete the target user from the database" do
      prev_count = User.count
      sign_in(@user)
      delete :destroy, params: {id: @user2.id}
      expect(User.count).to eq(prev_count - 1)
      expect(User.all).to include(@user)
      expect(User.all).to include(@user1)
      expect(User.all).not_to include(@user2)
    end

    it "should provide an updated list of all the users" do
      sign_in(@user)
      patch :update, params: {id: @user2.id}
      expect(assigns(:users)).to eq(User.all)
    end
  end
end
