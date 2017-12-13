module Api
class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = User.search(params[:search]) #"search" term defined at self.search in user model
    render json: @user
  end

  def friends
    # @user = User.find(params[:id])
    friends = current_user.friends
    render json: friends
  end

end
end
