require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    user_name { |n| "user#{n}" }
    zip_code { "#{rand(9)}" + "#{rand(9)}" + "#{rand(9)}" + "#{rand(9)}" + "#{rand(9)}" }
    password { 'password' }
    password_confirmation { 'password' }
    profile_photo { Rack::Test::UploadedFile.new(Rails.root.join('spec/support/images/photo.png'), 'image/png') }
  end

end
