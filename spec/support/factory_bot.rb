require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    sequence(:user_name) { |n| "user#{n}" }
    zip_code { "02138" }
    password { 'password' }
    password_confirmation { 'password' }
    profile_photo { Rack::Test::UploadedFile.new(Rails.root.join('spec/support/images/photo.png'), 'image/png') }

    factory :user_with_items do

      transient do
        items_count { 5 }
      end

      after(:create) do |user, evaluator|
        create_list(:item, evaluator.items_count, user: user)
      end
    end

  end

  factory :item do
    association :user, factory: :user
    sequence(:name) { |n| "item#{n}" }
    sequence(:description) { |n| "description#{n}" }
    asking_price { "#{rand(999999999)}"}
    zip_code { "02138" }
    image { Rack::Test::UploadedFile.new(Rails.root.join('spec/support/images/photo.png'), 'image/png') }

    factory :item_with_comments do

      transient do
        comments_count { 5 }
      end

      after(:create) do |item, evaluator|
        create_list(:comment, evaluator.comments_count, item: item)
      end
    end

  end

  factory :comment do
    association :item, factory: :item
    association :user, factory: :user
    sequence(:body) { |n| "comment#{n}" }
  end

end
