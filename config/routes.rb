Rails.application.routes.draw do
  resources :users, only: [:index]
  resources :recaps
  resources :stories
  resources :templates
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
      resources :recaps
      resources :stories
      resources :templates
    end
  end
end
