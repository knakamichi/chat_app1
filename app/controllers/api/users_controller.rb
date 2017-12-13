module Api
class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = User.search(params[:search]) #"search" term defined at self.search in user model
    render json: @user
  end

  def friends
    # binding.pry
    @friends = User.where(params[:followed_id])
    render json: @friends
  end

  end
end
