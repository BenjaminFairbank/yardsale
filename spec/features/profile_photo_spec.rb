require "rails_helper"

feature "profile photo" do
  scenario "user uploads a profile photo" do
    visit root_path
    click_link "Create a new account"

    fill_in "Email", with: "thesingingsandwich@cramular.com"
    fill_in "User name", with: "BingoBango"
    fill_in "Password", with: "boomstick!3vilisd3ad"
    fill_in "Password confirmation", with: "boomstick!3vilisd3ad"
    fill_in "Zip code", with: "02345"
    attach_file :user_profile_photo, "#{Rails.root}/spec/support/images/photo.png"

    click_button "Create your new account"

    User.first.confirm

    fill_in "Enter your email:", with: "thesingingsandwich@cramular.com"
    fill_in "Enter your password:", with: "boomstick!3vilisd3ad"
    click_button "Log in to YardSale"

    expect(page).to have_content('My Lawn')
    expect(page).to have_content('Sign Out')
    expect(page).to have_css("img[src*='photo.png']")
  end
end
