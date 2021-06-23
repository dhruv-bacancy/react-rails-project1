Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'

  namespace :api do
    namespace :v1 do
      resources :images
    end
  end

  get '*path', to: 'home#index', via: :all
end
