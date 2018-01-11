class UsersController < ApplicationController
  before_action :authenticate_user!
  def show
    @users = current_user
  end

  def search
  end

end
