require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    sequence(:user_name) { |n| "user#{n}" }
    zip_code { "#{rand(9)}" + "#{rand(9)}" + "#{rand(9)}" + "#{rand(9)}" + "#{rand(9)}" }
    password { 'password' }
    password_confirmation { 'password' }
    profile_photo { Rack::Test::UploadedFile.new(Rails.root.join('spec/support/images/photo.png'), 'image/png') }
  end

  factory :item do
    association :user, factory: :user
    sequence(:name) { |n| "item#{n}" }
    sequence(:description) { |n| "description#{n}" }
    asking_price { "#{rand(999999999)}"}
    zip_code { "#{rand(9)}" + "#{rand(9)}" + "#{rand(9)}" + "#{rand(9)}" + "#{rand(9)}" }
    image { Rack::Test::UploadedFile.new(Rails.root.join('spec/support/images/photo.png'), 'image/png') }
  end

end
