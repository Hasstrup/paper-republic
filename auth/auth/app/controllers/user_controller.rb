class UserController < ApplicationController
  #this is for signing up and storing the user id in the session
  def create
    @user = User.create(user_params)

    
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :passwordconf)
  end
end
