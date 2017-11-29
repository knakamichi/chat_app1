module Api
class UsersController < ApplicationController
  before_action :authenticate_user!

  def search
    @user = User.where(params[:])
    render json: @user
  end


end
