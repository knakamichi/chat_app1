class Api::CurrentUserController < ApplicationController
  before_action :authenticate_user!

  def index
    @current_user = current_user
    render json: @current_user
  end

end
