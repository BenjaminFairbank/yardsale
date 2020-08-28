Rails.application.routes.draw do
  root "homes#index"
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  unauthenticated :user do
    root to: "devise/sessions#new"
  end

  get "/items", to: "homes#index"
  get "/items/:id", to: "homes#index"
  get "/users/:id", to: "homes#index"
  get "/items/:id/edit", to: "homes#index"

  namespace :admin do
    resources :users, only: [:index, :show, :update, :destroy]
    resources :items, only: [:destroy]
    resources :comments, only: [:destroy]
  end

  namespace :api do
    namespace :v1 do
      resources :users, only: [:show]
      resources :items, only: [:index, :show, :create, :update, :destroy]
      resources :comments, only: [:index, :create, :destroy]
    end
  end
end
