Rails.application.routes.draw do
  scope 'user' do
    get '/login', to: 'user#new'
    get '/signup', to: 'user#create'
    get '/logout', to: 'user#destroy'
  end
end
