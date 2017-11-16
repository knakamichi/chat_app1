module Api
  class MessagesController < ApplicationController
  before_action :authenticate_user!

    def index
      @messages = Message.all
      render json: @messages
    end

    def create
      content = params[:contents]
      message = Message.new(content: content)
      message.save
      render json: message
    end

    private

      # def message_params
      #   params.require(:contents).permit(:contents)
      # end
  end

end
