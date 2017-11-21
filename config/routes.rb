Rails.application.routes.draw do

  get 'users/index'

  get 'users/show'

devise_for :users, controllers: {
    sessions: 'users/sessions',
    passwords: 'users/passwords',
    registrations: 'users/registrations',
    confirmations: 'users/confirmations'
  }
  resources :users, :only => [:show]

  namespace :api, { format: 'json' } do
    resources :messages
  end

  resources :users do
    member do
      get :following, :followers
    end
  end

  resources :relationships, only: [:create, :destroy]

  root to: 'messages#index'


end
