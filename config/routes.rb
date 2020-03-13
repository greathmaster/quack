Rails.application.routes.draw do
	
	namespace :api, defaults: {format: :json} do
		resources :users, only: [:create, :show, :update]
		resources :channels, only: [:show, :create]
		resources :messages, only: [:create]
		resource :session, only: [:create, :destroy, :show]
		mount ActionCable.server => '/cable'
	end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  post "/search", to: "api/searches#users_search", format: :json
end

# remove get all users -> not needed

# api/channels/ only for current user