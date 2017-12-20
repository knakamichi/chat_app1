Rails.application.routes.draw do

devise_for :users, controllers: {
    sessions: 'users/sessions',
    passwords: 'users/passwords',
    registrations: 'users/registrations',
    confirmations: 'users/confirmations'
  }

  namespace :api, { format: 'json' } do
    resources :current_user
    resources :messages
    get '/users/search', to: 'users#search'
    resources :users
    #   collection do
    #     get :friends
    #   end
    # end
    # resources :relationships,  only: [:create, :destroy]
    resources :friends
  end

  get '/users/search', to: 'users#search'
  resources :users
  resources :friend_requests
  root to: 'messages#index'

end
