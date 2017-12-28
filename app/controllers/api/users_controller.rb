module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!
    before_action :configure_permitted_parameters, if: :devise_controller?

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

    # def create
    #   lastSeen = DateTime.parse(params[:last_seen])
    #   # lastSeen.save
    #   render json: lastSeen
    # end

    def update
      # binding.pry
      lastSeen = DateTime.parse(params[:last_seen])
      # lastSeen.save
      render json: lastSeen
    end

    protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:last_seen) }
    end

  end
end
