module Api
class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    @user=User.all
    if params[:search]
      @user = User.search(params[:search]) #"search" term defined at self.search in user model
    else
      @user=User.all
    end
    render json: @user
  end


  end
end
