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
    resources :users do
      collection do
        get :friends
      end
    end
    resources :relationships,  only: [:create, :destroy]
  end

  get '/users/search', to: 'users#search'
  resources :users
  root to: 'messages#index'

end
