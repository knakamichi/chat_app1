Rails.application.routes.draw do

devise_for :users, controllers: {
    sessions: 'users/sessions',
    passwords: 'users/passwords',
    registrations: 'users/registrations',
    confirmations: 'users/confirmations'
  }

  namespace :api, { format: 'json' } do
    get '/current_user', to: 'current_user#show'
    get '/users/search', to: 'users#search'
    resources :users, only: [:index, :show]
    resources :messages, only: [:index, :create, :destroy]
    resources :friends, only: [:index, :destroy]
  end

  get '/users/search', to: 'users#search'
  get '/users/show', to: 'users#show'
  resources :friend_requests, only: [:index, :create, :update, :destroy]
  root to: 'messages#index'

end
