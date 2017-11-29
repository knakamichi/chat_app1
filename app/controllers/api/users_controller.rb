module Api
class UsersController < ApplicationController
  before_action :authenticate_user!

  def search
    @user = User.search(params[:search]) #"search" term defined at self.search in user model
    render json: @user
  end


end
