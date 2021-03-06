require 'rails_helper'

feature 'user signs out', %Q{
  As an authenticated user
  I want to sign out
  So that my identity is forgotten about on the machine I'm using
} do
  # Acceptance Criteria
  # * If I'm signed in, I have an option to sign out
  # * When I opt to sign out, I get a confirmation that my identity has been
  #   forgotten on the machine I'm using

  scenario 'authenticated user signs out' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Enter your email:', with: user.email
    fill_in 'Enter your password:', with: user.password

    click_button 'Log in to YardSale'

    expect(page).to have_content('My Lawn')
    expect(page).to have_content('Sign Out')

    click_link 'Sign Out'
    expect(page).to_not have_content('My Lawn')
    expect(page).to_not have_content('Sign Out')
  end

  scenario 'unauthenticated user attempts to sign out' do
    visit '/'
    expect(page).to_not have_content('My Lawn')
    expect(page).to_not have_content('Sign Out')
  end
end
