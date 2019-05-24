Rails.application.routes.draw do
  resources :recap_stories
  resources :user_recaps
  resources :users
  resources :recaps
  resources :stories
  resources :templates
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users
      resources :recaps
      resources :stories
      resources :templates
      resources :recap_stories
      resources :user_recaps
    end
  end
end
