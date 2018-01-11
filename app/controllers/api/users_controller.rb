module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!

    def index
      @user = User.all
      render json: @user
    end

    def search
      @user = User.search(params[:search])
      render json: @user
    end

    def show
      @user = User.find(params[:id])
      render json: @user
    end

  end
end
