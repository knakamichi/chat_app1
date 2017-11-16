Rails.application.routes.draw do

devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  namespace :api, { format: 'json' } do
    resources :messages

  end

root to: 'messages#index'

end
