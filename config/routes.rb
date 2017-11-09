Rails.application.routes.draw do

  get 'sessions/new'

  devise_for :views
  devise_for :users
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

namespace :api, { format: 'json' } do
  resources :messages
end

  resources :messages
  root to: 'messages#index'
end
