class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

 def sessionize (username):
   @session = Session.find_by(username: username)
   if @session
     @session
   else
     @newsession = Session.create(username: username)
     return @newsession
   end
 end 

  def authenticate (username, password):
   @user =  User.find_by(username: username)
   if @user && @user.password === password
     sessionize(@user)
   else
     nil
   end
  end

end
