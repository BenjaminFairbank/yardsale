require 'rails_helper'

feature 'user signs in', %Q{
  As a signed up user
  I want to sign in
  So that I can regain access to my account
} do
  scenario 'specify valid credentials' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Enter your email:', with: user.email
    fill_in 'Enter your password:', with: user.password

    click_button 'Log in to YardSale'

    expect(page).to have_content('My Lawn')
    expect(page).to have_content('Sign Out')
  end

  scenario 'specify invalid credentials' do
    visit new_user_session_path

    click_button 'Log in'
    expect(page).to have_content('Invalid Email or password')
    expect(page).to_not have_content('My Lawn')
    expect(page).to_not have_content('Sign Out')
  end
end
