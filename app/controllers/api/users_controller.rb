module Api
class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = User.search(params[:search]) #"search" term defined at self.search in user model
    render json: @user
  end

  def following
    @title = "Following"
    @user  = User.find(params[:id])
    @users = @user.following
    render json: @users
  end

  def followers
    @title = "Followers"
    @user  = User.find(params[:id])
    @users = @user.followers
    render json: @users
  end

  end
end
