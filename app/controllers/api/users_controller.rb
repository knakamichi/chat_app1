module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!

    def index
      @user = User.all
      render json: @user
    end

    def search
      @user = User.search(params[:search]) #"search" term defined at self.search in user model
      render json: @user
    end

    def show
      @user = User.find(params[:id])
      render json: @user
    end
  #
  #   def create
  #     lastAccess = User.new(id: params[:id], lastAccess: lastAccess)
  #     lastAccess.save
  #   end
  #
  #   def update
  #     lastAccess = User.
  end
end
